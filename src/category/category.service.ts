import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepo.create(dto);
    return this.categoryRepo.save(category);
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepo.find();
  }

  async findById(id: number): Promise<Category> {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) throw new NotFoundException(`Category #${id} not found`);
    return category;
  }

  async update(id: number, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepo.preload({ id, ...dto });
    if (!category) throw new NotFoundException(`Category #${id} not found`);
    return this.categoryRepo.save(category);
  }

  async remove(id: number): Promise<number> {
    await this.categoryRepo.delete(id);
    return id;
  }
}
