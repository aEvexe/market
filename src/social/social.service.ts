// src/social/social.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Social } from './entities/social.entity';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';
import { Store } from '../store/entities/store.entity';

@Injectable()
export class SocialService {
  constructor(
    @InjectRepository(Social)
    private readonly socialRepository: Repository<Social>,
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async create(dto: CreateSocialDto): Promise<Social> {
    const store = await this.storeRepository.findOne({ where: { id: dto.storeId } });
    if (!store) throw new NotFoundException('Store not found');

    const social = this.socialRepository.create({
      name: dto.name,
      type: dto.type,
      link: dto.link,
      store,
    });
    return this.socialRepository.save(social);
  }

  async findAll(): Promise<Social[]> {
    return this.socialRepository.find({ relations: ['store'] });
  }

  async findOne(id: number): Promise<Social> {
    const social = await this.socialRepository.findOne({ where: { id }, relations: ['store'] });
    if (!social) throw new NotFoundException(`Social with ID ${id} not found`);
    return social;
  }

  async update(id: number, dto: UpdateSocialDto): Promise<Social> {
    const social = await this.findOne(id);

    if (dto.storeId) {
      const store = await this.storeRepository.findOne({ where: { id: dto.storeId } });
      if (!store) throw new NotFoundException('Store not found');
      social.store = store!;
    }

    Object.assign(social, dto);
    return this.socialRepository.save(social);
  }

  async remove(id: number) {
    await this.socialRepository.delete(id)
    return id
  }
}
