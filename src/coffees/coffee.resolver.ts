import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ParseIntPipe } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeInputDto } from './dto/create-coffee.input/create-coffee.input';
import { UpdateCoffeeInputDto } from './dto/update-coffee.input/update-coffee.input';
import { CoffeeModel } from './entities/coffee.entity/coffee.entity';

@Resolver()
export class CoffeeResolver {
  constructor(private readonly coffeesService: CoffeeService) {}

  @Query('coffees')
  async findAll(): Promise<CoffeeModel[]> {
    return this.coffeesService.findAll();
  }

  @Query('coffee')
  async findOne(@Args('id', ParseIntPipe) id: number): Promise<CoffeeModel> {
    return this.coffeesService.getOne(id);
  }

  @Mutation('createCoffee')
  async create(
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInputDto,
  ): Promise<CoffeeModel> {
    return this.coffeesService.create(createCoffeeInput);
  }

  @Mutation('updateCoffee')
  async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateCoffeeInput') updateCoffeeInput: UpdateCoffeeInputDto,
  ): Promise<CoffeeModel> {
    return this.coffeesService.update(id, updateCoffeeInput);
  }

  @Mutation('removeCoffee')
  async remove(@Args('id', ParseIntPipe) id: number): Promise<CoffeeModel> {
    return this.coffeesService.remove(id);
  }
}