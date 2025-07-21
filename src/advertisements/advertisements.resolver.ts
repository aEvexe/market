import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Advertisement } from './entities/advertisement.entity';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { AdvertisementsService } from './advertisements.service';

@Resolver(() => Advertisement)
export class AdvertisementResolver {
  constructor(private readonly advertisementService: AdvertisementsService) {}

  @Mutation(() => Advertisement)
  createAdvertisement(@Args('createAdvertisementDto') dto: CreateAdvertisementDto) {
    return this.advertisementService.create(dto);
  }

  @Query(() => [Advertisement])
  findAllAdvertisements() {
    return this.advertisementService.findAll();
  }

  @Query(() => Advertisement)
  findOneAdvertisement(@Args('id', { type: () => Int }) id: number) {
    return this.advertisementService.findOne(id);
  }

  @Mutation(() => Advertisement)
  updateAdvertisement(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateAdvertisementDto') dto: UpdateAdvertisementDto,
  ) {
    return this.advertisementService.update(id, dto);
  }

  @Mutation(() => Int)
  removeAdvertisement(@Args('id', { type: () => Int }) id: number) {
    return this.advertisementService.remove(id);
  }
}
