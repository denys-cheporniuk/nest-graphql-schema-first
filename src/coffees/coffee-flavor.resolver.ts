import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import {
  FlavorsByCoffeeLoader
} from './data-loader/flavors-by-coffee.loader/flavors-by-coffee.loader';
import { CoffeeModel } from './entities/coffee.entity/coffee.entity';

@Resolver('Coffee')
export class CoffeeFlavorsResolver {
  constructor(private readonly flavorsByCoffeeLoader: FlavorsByCoffeeLoader) {}

  @ResolveField('flavors')
  async getFlavorsOfCoffee(@Parent() coffee: CoffeeModel) {
    return this.flavorsByCoffeeLoader.load(coffee.id);
  }
}
