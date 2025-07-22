import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from './entities/request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,
  ) {}

  async create(createRequestDto: CreateRequestDto): Promise<Request> {
    const request = this.requestRepository.create(createRequestDto);
    return this.requestRepository.save(request);
  }

  async findAll(): Promise<Request[]> {
    return this.requestRepository.find({ relations: ['users'] });
  }

  async findOne(id: number): Promise<Request> {
    const request = await this.requestRepository.findOne({
      where: { id },
      relations: ['users'],
    });
    if (!request) throw new NotFoundException(`Request #${id} not found`);
    return request;
  }

  async update(id: number, updateRequestDto: UpdateRequestDto): Promise<Request> {
    await this.requestRepository.update(id, updateRequestDto);
    return this.findOne(id);
  }

  async remove(id: number){
    await this.requestRepository.delete(id)
    return id
  }
}
