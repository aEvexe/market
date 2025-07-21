import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DermantinImageService } from './dermantin-image.service';
import { CreateDermantinImageDto } from './dto/create-dermantin-image.dto';
import { UpdateDermantinImageDto } from './dto/update-dermantin-image.dto';

@Controller('dermantin-image')
export class DermantinImageController {
  constructor(private readonly dermantinImageService: DermantinImageService) {}

  @Post()
  create(@Body() createDermantinImageDto: CreateDermantinImageDto) {
    return this.dermantinImageService.create(createDermantinImageDto);
  }

  @Get()
  findAll() {
    return this.dermantinImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dermantinImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDermantinImageDto: UpdateDermantinImageDto) {
    return this.dermantinImageService.update(+id, updateDermantinImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dermantinImageService.remove(+id);
  }
}
