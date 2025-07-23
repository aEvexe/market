// src/oreder/oreder.resolver.ts
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrederService } from './oreder.service';
import { Oreder } from './entities/oreder.entity';
import { CreateOrederDto } from './dto/create-oreder.dto';
import { UpdateOrederDto } from './dto/update-oreder.dto';

@Resolver(() => Oreder)
export class OrederResolver {
  constructor(private readonly orederService: OrederService) {}

  @Mutation(() => Oreder)
  createOreder(@Args('createOrederDto') createOrederDto: CreateOrederDto) {
    return this.orederService.create(createOrederDto);
  }

  @Query(() => [Oreder])
  oreden() {
    return this.orederService.findAll();
  }

  @Query(() => Oreder)
  oreder(@Args('id', { type: () => Int }) id: number) {
    return this.orederService.findOne(id);
  }

  @Mutation(() => Oreder)
  updateOreder(@Args('updateOrederDto') updateOrederDto: UpdateOrederDto) {
    return this.orederService.update(updateOrederDto.id, updateOrederDto);
  }

  @Mutation(() => Boolean)
  removeOreder(@Args('id', { type: () => Int }) id: number) {
    return this.orederService.remove(id);
  }
}
