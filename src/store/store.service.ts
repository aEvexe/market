import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepo: Repository<Store>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createStoreDto: CreateStoreDto) {
    const manager = await this.userRepo.findOneBy({ id: createStoreDto.managerId });
    if (!manager) throw new NotFoundException('Manager not found');

    const store = this.storeRepo.create({ ...createStoreDto, manager });
    return this.storeRepo.save(store);
  }

  findAll() {
    return this.storeRepo.find({ relations: ['manager', 'dermantins'] });
  }

  async findOne(id: number) {
    const store = await this.storeRepo.findOne({
      where: { id },
      relations: ['manager', 'dermantins'],
    });
    if (!store) throw new NotFoundException('Store not found');
    return store;
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
  const store = await this.storeRepo.preload({ id, ...updateStoreDto });

  if (!store) throw new NotFoundException('Store not found');

  if (updateStoreDto.managerId) {
    const manager = await this.userRepo.findOneBy({ id: updateStoreDto.managerId });
    if (!manager) throw new NotFoundException('Manager not found');
    store.manager = manager;
  }

  return this.storeRepo.save(store);
}


  async remove(id: number) {
    const store = await this.findOne(id);
    await this.storeRepo.remove(store);
    return id;
  }
}
