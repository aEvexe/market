import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { User } from '../users/entities/user.entity';
import { Store } from '../store/entities/store.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepo: Repository<Chat>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Store) private storeRepo: Repository<Store>,
  ) {}

  async create(createChatDto: CreateChatDto): Promise<Chat> {
    const user = await this.userRepo.findOneBy({ id: createChatDto.user_id });
    const store = await this.storeRepo.findOneBy({ id: createChatDto.store_id });

    if (!user || !store) {
      throw new NotFoundException('User or Store not found');
    }

    const chat = this.chatRepo.create({ user, store });
    return this.chatRepo.save(chat);
  }

  findAll(): Promise<Chat[]> {
    return this.chatRepo.find({ relations: ['user', 'store'] });
  }

  findOne(id: number): Promise<Chat | null> {
    return this.chatRepo.findOne({ where: { id }, relations: ['user', 'store'] });
  }

  async update(id: number, updateChatDto: UpdateChatDto): Promise<Chat> {
    const chat = await this.chatRepo.findOneBy({ id });
    if (!chat) throw new NotFoundException('Chat not found');

    if (updateChatDto.user_id) {
      const user = await this.userRepo.findOneBy({ id: updateChatDto.user_id });
      if (!user) throw new NotFoundException('User not found');
      chat.user = user;
    }

    if (updateChatDto.store_id) {
      const store = await this.storeRepo.findOneBy({ id: updateChatDto.store_id });
      if (!store) throw new NotFoundException('Store not found');
      chat.store = store;
    }

    return this.chatRepo.save(chat);
  }

  async remove(id: number): Promise<number> {
    await this.chatRepo.delete(id);
    return id;
  }
}
