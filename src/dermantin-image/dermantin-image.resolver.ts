import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { DermantinImageService } from './dermantin-image.service';
import { DermantinImage } from './entities/dermantin-image.entity';
import { CreateDermantinImageDto } from './dto/create-dermantin-image.dto';
import { UpdateDermantinImageDto } from './dto/update-dermantin-image.dto';

@Resolver(() => DermantinImage)
export class DermantinImageResolver {
  constructor(private readonly imageService: DermantinImageService) {}

  @Mutation(() => DermantinImage)
  createDermantinImage(@Args('createDermantinImageDto') dto: CreateDermantinImageDto) {
    return this.imageService.create(dto);
  }

  @Query(() => [DermantinImage])
  findAllDermantinImage() {
    return this.imageService.findAll();
  }

  @Query(() => DermantinImage)
  findOneDermantinImage(@Args('id', { type: () => ID }) id: number) {
    return this.imageService.findOne(id);
  }

  @Mutation(() => DermantinImage)
  updateDermantinImage(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateDermantinImageDto') dto: UpdateDermantinImageDto,
  ) {
    return this.imageService.update(id, dto);
  }

  @Mutation(() => Boolean)
  removeDermantinImage(@Args('id', { type: () => ID }) id: number) {
    return this.imageService.remove(id);
  }
}
