import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './entities/history.entity';
import { Dermantin } from '../dermantin/entities/dermantin.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([History, Dermantin, User])],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
