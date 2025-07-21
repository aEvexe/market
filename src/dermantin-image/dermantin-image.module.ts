import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DermantinImage } from './entities/dermantin-image.entity';
import { Dermantin } from '../dermantin/entities/dermantin.entity';
import { DermantinImageService } from './dermantin-image.service';
import { DermantinImageResolver } from './dermantin-image.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([DermantinImage, Dermantin])],
  providers: [DermantinImageService, DermantinImageResolver],
})
export class DermantinImageModule {}
