import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ParseIntPipe } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeInputDto } from './dto/create-coffee.input/create-coffee.input';
import { UpdateCoffeeInputDto } from './dto/update-coffee.input/update-coffee.input';
import { CoffeeEntity } from './entities/coffee.entity/coffee.entity';
import { PubSub } from 'graphql-subscriptions';

@Resolver()
export class CoffeeResolver {
  constructor(
    private readonly coffeesService: CoffeeService,
    private readonly pubSub: PubSub,
  ) {}

  @Query('coffees')
  async findAll(): Promise<CoffeeEntity[]> {
    return this.coffeesService.findAll();
  }

  @Query('coffee')
  async findOne(@Args('id', ParseIntPipe) id: number): Promise<CoffeeEntity> {
    return this.coffeesService.getOne(id);
  }

  @Mutation('createCoffee')
  async create(
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInputDto,
  ): Promise<CoffeeEntity> {
    return this.coffeesService.create(createCoffeeInput);
  }

  @Mutation('updateCoffee')
  async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateCoffeeInput') updateCoffeeInput: UpdateCoffeeInputDto,
  ): Promise<CoffeeEntity> {
    return this.coffeesService.update(id, updateCoffeeInput);
  }

  @Mutation('removeCoffee')
  async remove(@Args('id', ParseIntPipe) id: number): Promise<CoffeeEntity> {
    return this.coffeesService.remove(id);
  }

  @Subscription()
  coffeeAdded() {
    return this.pubSub.asyncIterator('coffeeAdded')
  }
}
