import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from './entities/history.entity';
import { Repository } from 'typeorm';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { User } from '../users/entities/user.entity';
import { Dermantin } from '../dermantin/entities/dermantin.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History) private historyRepo: Repository<History>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Dermantin) private dermantinRepo: Repository<Dermantin>
  ) {}

  async create(dto: CreateHistoryDto) {
    const user = await this.userRepo.findOneBy({ id: dto.user_id });
    const dermantin = await this.dermantinRepo.findOneBy({ id: dto.dermantin_id });

    if (!user || !dermantin) throw new NotFoundException('User or Dermantin not found');

    const history = this.historyRepo.create({
      user,
      dermantin,
    });

    return this.historyRepo.save(history);
  }

  findAll() {
    return this.historyRepo.find({
      relations: ['user', 'dermantin'],
    });
  }

  async findOne(id: number) {
    const history = await this.historyRepo.findOne({
      where: { id },
      relations: ['user', 'dermantin'],
    });
    if (!history) throw new NotFoundException('History not found');
    return history;
  }

  async update(id: number, dto: UpdateHistoryDto) {
  const history = await this.historyRepo.findOneBy({ id });
  if (!history) throw new NotFoundException('History not found');

  if (dto.user_id) {
    const user = await this.userRepo.findOneBy({ id: dto.user_id });
    if (!user) throw new NotFoundException('User not found');
    history.user = user;
  }

  if (dto.dermantin_id) {
    const dermantin = await this.dermantinRepo.findOneBy({ id: dto.dermantin_id });
    if (!dermantin) throw new NotFoundException('Dermantin not found');
    history.dermantin = dermantin;
  }

  return this.historyRepo.save(history);
}

  async remove(id: number) {
    const result = await this.historyRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('History not found');
    return id;
  }
}
