import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from './entities/type.entity';
import { Repository } from 'typeorm';
import { throws } from 'assert';

@Injectable()
export class TypeService {
  constructor(@InjectRepository(Type) private readonly typeRepo: Repository<Type>){}
  create(createTypeDto: CreateTypeDto) {
    const type = this.typeRepo.create(createTypeDto);
    return this.typeRepo.save(type)
  }

  findAll() {
    return this.typeRepo.find();
  }

  findOne(id: number) {
    return this.typeRepo.findBy({id});
  }

  async update(id: number, updateTypeDto: UpdateTypeDto) {
    const type = await this.typeRepo.preload({id, ...updateTypeDto});
    if(!type){
      throw new NotFoundException("Not found thi type")
    }

    return this.typeRepo.save(type)
  }

  async remove(id: number) {
    await this.typeRepo.delete(id);
    return id
  }
}
