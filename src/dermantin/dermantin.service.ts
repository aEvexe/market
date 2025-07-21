import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dermantin } from './entities/dermantin.entity';
import { CreateDermantinDto } from './dto/create-dermantin.dto';
import { UpdateDermantinDto } from './dto/update-dermantin.dto';

@Injectable()
export class DermantinService {
  constructor(
    @InjectRepository(Dermantin)
    private dermantinRepo: Repository<Dermantin>,
  ) {}

  create(dto: CreateDermantinDto) {
    const item = this.dermantinRepo.create(dto);
    return this.dermantinRepo.save(item);
  }

  findAll() {
    return this.dermantinRepo.find({ relations: ['images', 'store'] });
  }

  findOne(id: number) {
    return this.dermantinRepo.findOne({ where: { id }, relations: ['images', 'store'] });
  }

  async update(id: number, dto: UpdateDermantinDto) {
    const dermantin = await this.dermantinRepo.preload({ id, ...dto });
    if (!dermantin) throw new NotFoundException('Not found');
    return this.dermantinRepo.save(dermantin);
  }

  async remove(id: number) {
    const result = await this.dermantinRepo.delete(id);
    if (!result.affected) throw new NotFoundException('Not found');
    return id;
  }
}