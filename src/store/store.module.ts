import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreService } from './store.service';
import { StoreResolver } from './store.resolver';
import { Store } from './entities/store.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Store, User])],
  providers: [StoreService, StoreResolver],
  exports: [StoreService]
})
export class StoreModule {}
