import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Resolver(() => Chat)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Mutation(() => Chat)
  createChat(@Args('input') input: CreateChatDto): Promise<Chat> {
    return this.chatService.create(input);
  }

  @Query(() => [Chat])
  chats(): Promise<Chat[]> {
    return this.chatService.findAll();
  }

  @Query(() => Chat)
  chat(@Args('id', { type: () => Int }) id: number): Promise<Chat | null> {
    return this.chatService.findOne(id);
  }

  @Mutation(() => Chat)
  updateChat(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateChatDto,
  ): Promise<Chat> {
    return this.chatService.update(id, input);
  }

  @Mutation(() => Int)
  removeChat(@Args('id', { type: () => Int }) id: number): Promise<number> {
    return this.chatService.remove(id);
  }
}
