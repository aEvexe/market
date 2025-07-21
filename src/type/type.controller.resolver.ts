import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TypeService } from './type.service';
import { Type } from './entities/type.entity';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

@Resolver(() => Type)
export class TypeResolver {
  constructor(private readonly typeService: TypeService) {}

  @Query(() => [Type])
  findAllType() {
    return this.typeService.findAll();
  }

  @Query(() => Type)
  findOneType(@Args('id', { type: () => ID }) id: number) {
    return this.typeService.findOne(+id);
  }

  @Mutation(() => Type)
  createType(@Args('createType') createTypeDto: CreateTypeDto) {
    return this.typeService.create(createTypeDto);
  }

  @Mutation(() => Type)
  updateType(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateType') updateTypeDto: UpdateTypeDto,
  ) {
    return this.typeService.update(+id, updateTypeDto);
  }

  @Mutation(() => Number)
  removeType(@Args('id', { type: () => ID }) id: number) {
    return this.typeService.remove(+id);
  }
}
