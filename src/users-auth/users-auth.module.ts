import { Module } from '@nestjs/common';
import { AuthService } from './users-auth.service';
import { UsersAuthController } from './users-auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [JwtModule.register({}), UsersModule],
  controllers: [UsersAuthController],
  providers: [AuthService],
})
export class UsersAuthModule {}
