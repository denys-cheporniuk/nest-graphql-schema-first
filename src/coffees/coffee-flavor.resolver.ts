import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { FlavorModel } from '../flavors/entities/flavor.entity/flavor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Resolver('Coffee')
export class CoffeeFlavorsResolver {
  constructor(
    @InjectRepository(FlavorModel)
    private readonly flavorsRepository: Repository<FlavorModel>,
  ) {}

  @ResolveField('flavors')
  async getFlavorsOfCoffee(@Parent() coffee: FlavorModel) {
    return this.flavorsRepository
      .createQueryBuilder('flavor')
      .innerJoin('flavor.coffees', 'coffees', 'coffees.id = :coffeeId', {
        coffeeId: coffee.id,
      })
      .getMany();
  }
}
