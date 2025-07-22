import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Chat } from '../chat/entities/chat.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private readonly messageRepo: Repository<Message>,
    @InjectRepository(Chat) private readonly chatRepo: Repository<Chat>,
  ) {}

  async create(dto: CreateMessageDto): Promise<Message> {
    const chat = await this.chatRepo.findOneBy({ id: dto.chatId });
    if (!chat) throw new NotFoundException('Chat not found');

    const message = this.messageRepo.create({ text: dto.text, is_read: dto.is_read, chat });
    return this.messageRepo.save(message);
  }

  findAll(): Promise<Message[]> {
    return this.messageRepo.find({ relations: ['chat'] });
  }

  findOne(id: number): Promise<Message| null> {
    return this.messageRepo.findOne({ where: { id }, relations: ['chat'] });
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
  const message = await this.messageRepo.preload({ id, ...updateMessageDto });
  if (!message) throw new NotFoundException('Message not found');
  return this.messageRepo.save(message);
}

  async remove(id: number): Promise<number> {
    await this.messageRepo.delete(id);
    return id;
  }
}
