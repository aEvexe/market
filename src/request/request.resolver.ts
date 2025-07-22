import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RequestService } from './request.service';
import { Request } from './entities/request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Resolver(() => Request)
export class RequestResolver {
  constructor(private readonly requestService: RequestService) {}

  @Mutation(() => Request)
  createRequest(@Args('createRequestDto') createRequestDto: CreateRequestDto): Promise<Request> {
    return this.requestService.create(createRequestDto);
  }

  @Query(() => [Request], { name: 'requests' })
  findAll(): Promise<Request[]> {
    return this.requestService.findAll();
  }

  @Query(() => Request, { name: 'request' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Request> {
    return this.requestService.findOne(id);
  }

  @Mutation(() => Request)
  updateRequest(
    @Args('updateRequestDto') updateRequestDto: UpdateRequestDto,
  ): Promise<Request> {
    return this.requestService.update(updateRequestDto.id, updateRequestDto);
  }

  @Mutation(() => Boolean)
  removeRequest(@Args('id', { type: () => Int }) id: number): Promise<number> {
    return this.requestService.remove(id);
  }
}
