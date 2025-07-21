import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SigninUserDto } from '../users/dto/signin-user.dto';

@Injectable()
export class AuthService { 
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async generateToken(user: User) {
    const payload = {
      id: user.id,
      is_verified: user.is_verified,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.USER_ACCESS_TOKEN_KEY,
        expiresIn: process.env.USER_ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.USER_REFRESH_TOKEN_KEY,
        expiresIn: process.env.USER_REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async register(createUserDto: CreateUserDto) {
    const existing = await this.userService.findByPhone(createUserDto.phone!);
    if (existing) {
      throw new ConflictException('This user already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return { userId: newUser.id };
  }

  async login(signinUserDto: SigninUserDto, res: Response) {
    const user = await this.userService.findByPhone(signinUserDto.phone);
    if (!user) {
      throw new UnauthorizedException("Phone number or password is incorrect");
    }

    const isMatched = await bcrypt.compare(
      signinUserDto.password,
      user.password,
    );

    if (!isMatched) {
      throw new UnauthorizedException("Phone number or password is incorrect");
    }

    const { accessToken, refreshToken } = await this.generateToken(user);

    const hashedToken = await bcrypt.hash(refreshToken, 7);
    user.refresh_token = hashedToken;
    await this.userService.update(user.id, { refresh_token: hashedToken });

    res.cookie('refreshToken', refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return { userId: user.id, accessToken };
  }

  async signout(refreshToken: string, res: Response) {
    res.clearCookie('refreshToken');
    return { message: 'User signed out' };
  }

  async refreshToken(id: number, refreshToken: string, res: Response) {
    const user = await this.userService.findById(id);
    if (!user || !user.refresh_token) {
      throw new UnauthorizedException('User not found or not signed in');
    }

    const isMatch = await bcrypt.compare(refreshToken, user.refresh_token);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = await this.generateToken(user);
    const hashedToken = await bcrypt.hash(tokens.refreshToken, 7);
    await this.userService.update(user.id, { refresh_token: hashedToken });

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return { userId: user.id, accessToken: tokens.accessToken };
  }
}
