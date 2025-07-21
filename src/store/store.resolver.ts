import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { StoreService } from './store.service';
import { Store } from './entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Resolver(() => Store)
export class StoreResolver {
  constructor(private readonly storeService: StoreService) {}

  @Query(() => [Store])
  findAllStore() {
    return this.storeService.findAll();
  }

  @Query(() => Store)
  findOneStore(@Args('id', { type: () => Int }) id: number) {
    return this.storeService.findOne(id);
  }

  @Mutation(() => Store)
  createStore(@Args('createStoreDto') createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @Mutation(() => Store)
  updateStore(@Args('id', { type: () => Int }) id: number, @Args('updateStoreDto') updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(id, updateStoreDto);
  }

  @Mutation(() => Int)
  removeStore(@Args('id', { type: () => Int }) id: number) {
    return this.storeService.remove(id);
  }
}
