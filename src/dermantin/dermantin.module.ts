import { Module } from '@nestjs/common';
import { DermantinService } from './dermantin.service';
import { DermantinController } from './dermantin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dermantin } from './entities/dermantin.entity';
import { Category } from '../category/entities/category.entity';
import { Store } from '../store/entities/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dermantin, Category, Store])],
  controllers: [DermantinController],
  providers: [DermantinService],
})
export class DermantinModule {}
