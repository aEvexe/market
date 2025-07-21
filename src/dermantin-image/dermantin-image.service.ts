import { Injectable } from '@nestjs/common';
import { CreateDermantinImageDto } from './dto/create-dermantin-image.dto';
import { UpdateDermantinImageDto } from './dto/update-dermantin-image.dto';

@Injectable()
export class DermantinImageService {
  create(createDermantinImageDto: CreateDermantinImageDto) {
    return 'This action adds a new dermantinImage';
  }

  findAll() {
    return `This action returns all dermantinImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dermantinImage`;
  }

  update(id: number, updateDermantinImageDto: UpdateDermantinImageDto) {
    return `This action updates a #${id} dermantinImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} dermantinImage`;
  }
}
