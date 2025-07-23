// src/oreder/oreder.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Oreder } from "./entities/oreder.entity";
import { CreateOrederDto } from "./dto/create-oreder.dto";
import { UpdateOrederDto } from "./dto/update-oreder.dto";
import { User } from "../users/entities/user.entity";
import { Store } from "../store/entities/store.entity";
import { Dermantin } from "../dermantin/entities/dermantin.entity";

@Injectable()
export class OrederService {
  constructor(
    @InjectRepository(Oreder)
    private readonly orederRepository: Repository<Oreder>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    @InjectRepository(Dermantin)
    private readonly dermantinRepository: Repository<Dermantin>
  ) {}

  async create(dto: CreateOrederDto): Promise<Oreder> {
    const user = await this.userRepository.findOne({
      where: { id: dto.userId },
    });
    if (!user) throw new NotFoundException("User not found");

    const store = await this.storeRepository.findOne({
      where: { id: dto.storeId },
    });
    if (!store) throw new NotFoundException("Store not found");

    const dermantin = await this.dermantinRepository.findOne({
      where: { id: dto.dermantinId },
    });
    if (!dermantin) throw new NotFoundException("Dermantin not found");

    const oreder = this.orederRepository.create({
      total_price: dto.total_price,
      remaining_price: dto.remaining_price,
      user,
      store,
      dermantin,
    });

    return this.orederRepository.save(oreder);
  }

  async findAll(): Promise<Oreder[]> {
    return this.orederRepository.find({
      relations: ["user", "store", "dermantin"],
    });
  }

  async findOne(id: number): Promise<Oreder> {
    const oreder = await this.orederRepository.findOne({
      where: { id },
      relations: ["user", "store", "dermantin"],
    });
    if (!oreder) throw new NotFoundException(`Order with ID ${id} not found`);
    return oreder;
  }

  async update(id: number, dto: UpdateOrederDto): Promise<Oreder> {
    const oreder = await this.findOne(id);
    const user = await this.userRepository.findOne({
      where: { id: dto.userId },
    });
    if (!user) throw new NotFoundException("User not found");
    oreder.user = user!;

    const store = await this.storeRepository.findOne({
      where: { id: dto.storeId },
    });
    if (!store) throw new NotFoundException("Store not found");
    oreder.store = store!;

    const dermantin = await this.dermantinRepository.findOne({
      where: { id: dto.dermantinId },
    });
    if (!dermantin) throw new NotFoundException("Dermantin not found");
    oreder.dermantin = dermantin!;

    Object.assign(oreder, dto);
    return this.orederRepository.save(oreder);
  }

  async remove(id: number): Promise<number> {
    await this.orederRepository.delete(id)
    return id
  }
}
