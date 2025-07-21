import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(@InjectRepository(Admin) private readonly adminRepo: Repository<Admin>){}
  async create(createAdminDto: CreateAdminDto) {
    const user = this.adminRepo.create(createAdminDto)
    return await this.adminRepo.save(user)
  }

  findAll() {
    return this.adminRepo.find();
  }

  async findById(id: number): Promise<Admin> {
    const admin = await this.adminRepo.findOneBy({ id });
    if (!admin) {
      throw new NotFoundException(`Admin with id #${id} not found`);
    }
    return admin;
  }

  findOne(id: number) {
    return this.adminRepo.findBy({id});
  }

  async findUserByEmail(email: string){
    return this.adminRepo.findOne({
      where: {email}
    })
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const user = await this.adminRepo.preload({id, ...updateAdminDto});
    if(!user){
      throw new NotFoundException(`#${id} id topilmadi`)
    }
    return this.adminRepo.save(user)
  }

  async remove(id: number) {
    await this.adminRepo.delete(id);
    return id
  }
}
