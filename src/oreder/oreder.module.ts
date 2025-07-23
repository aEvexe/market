import { Module } from '@nestjs/common';
import { OrederService } from './oreder.service';
import { OrederController } from './oreder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Oreder } from './entities/oreder.entity';
import { Dermantin } from '../dermantin/entities/dermantin.entity';
import { User } from '../users/entities/user.entity';
import { Store } from '../store/entities/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Oreder, Dermantin, User, Store])],
  controllers: [OrederController],
  providers: [OrederService],
})
export class OrederModule {}
