import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>){}
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto); // obyekt hosil qiladi
    return await this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find()
  }

  findOne(id: number) {
    return this.userRepo.findBy({id})
  }

    async findByPhone(phone: string) {
    return await this.userRepo.findOne({ where: { phone } });
  }

  async findById(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.preload({id, ...updateUserDto})
    if(!user){
      throw new NotFoundException(`#${id} id topilmadi`)
    }
    return this.userRepo.save(user)
  }

  async remove(id: number) {
    await this.userRepo.delete(id)
    return id
  }
}
