import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrederService } from './oreder.service';
import { CreateOrederDto } from './dto/create-oreder.dto';
import { UpdateOrederDto } from './dto/update-oreder.dto';

@Controller('oreder')
export class OrederController {
  constructor(private readonly orederService: OrederService) {}

  @Post()
  create(@Body() createOrederDto: CreateOrederDto) {
    return this.orederService.create(createOrederDto);
  }

  @Get()
  findAll() {
    return this.orederService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orederService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrederDto: UpdateOrederDto) {
    return this.orederService.update(+id, updateOrederDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orederService.remove(+id);
  }
}
