import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import {
  FlavorsByCoffeeLoader
} from './data-loader/flavors-by-coffee.loader/flavors-by-coffee.loader';
import { CoffeeEntity } from './entities/coffee.entity/coffee.entity';

@Resolver('Coffee')
export class CoffeeFlavorsResolver {
  constructor(private readonly flavorsByCoffeeLoader: FlavorsByCoffeeLoader) {}

  @ResolveField('flavors')
  async getFlavorsOfCoffee(@Parent() coffee: CoffeeEntity) {
    return this.flavorsByCoffeeLoader.load(coffee.id);
  }
}
