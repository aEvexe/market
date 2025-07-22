import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { Chat } from './entities/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Store } from '../store/entities/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, User, Store])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
