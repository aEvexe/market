import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Advertisement } from './entities/advertisement.entity';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { Dermantin } from '../dermantin/entities/dermantin.entity';

@Injectable()
export class AdvertisementsService {
  constructor(
    @InjectRepository(Advertisement)
    private readonly adRepo: Repository<Advertisement>,

    @InjectRepository(Dermantin)
    private readonly dermRepo: Repository<Dermantin>,
  ) {}

  async create(dto: CreateAdvertisementDto) {
    const dermantin = await this.dermRepo.findOneBy({ id: dto.dermantin_id });
    if (!dermantin) throw new NotFoundException('Dermantin not found');

    const advertisement = this.adRepo.create({ ...dto, dermantin });
    return this.adRepo.save(advertisement);
  }

  findAll() {
    return this.adRepo.find({ relations: ['dermantin'] });
  }

  async findOne(id: number) {
    const ad = await this.adRepo.findOne({ where: { id }, relations: ['dermantin'] });
    if (!ad) throw new NotFoundException('Advertisement not found');
    return ad;
  }

  async update(id: number, dto: UpdateAdvertisementDto) {
    const ad = await this.adRepo.preload({ id, ...dto });
    if (!ad) throw new NotFoundException('Advertisement not found');

    if (dto.dermantin_id) {
      const derm = await this.dermRepo.findOneBy({ id: dto.dermantin_id });
      if (!derm) throw new NotFoundException('Dermantin not found');
      ad.dermantin = derm;
    }

    return this.adRepo.save(ad);
  }

  async remove(id: number) {
    const ad = await this.findOne(id);
    await this.adRepo.remove(ad);
    return id;
  }
}
