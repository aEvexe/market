import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { DermantinService } from './dermantin.service';
import { Dermantin } from './entities/dermantin.entity';
import { CreateDermantinDto } from './dto/create-dermantin.dto';
import { UpdateDermantinDto } from './dto/update-dermantin.dto';

@Resolver(() => Dermantin)
export class DermantinResolver {
  constructor(private readonly service: DermantinService) {}

  @Query(() => [Dermantin])
  getAllDermantin() {
    return this.service.findAll();
  }

  @Query(() => Dermantin)
  getDermantin(@Args('id', { type: () => ID }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Dermantin)
  createDermantin(@Args('input') input: CreateDermantinDto) {
    return this.service.create(input);
  }

  @Mutation(() => Dermantin)
  updateDermantin(
    @Args('id', { type: () => ID }) id: number,
    @Args('input') input: UpdateDermantinDto,
  ) {
    return this.service.update(id, input);
  }

  @Mutation(() => Number)
  deleteDermantin(@Args('id', { type: () => ID }) id: number) {
    return this.service.remove(id);
  }
}