import { Module } from '@nestjs/common';
import { CoffeeResolver } from './coffee.resolver';
import { CoffeeService } from './coffee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeEntity } from './entities/coffee.entity/coffee.entity';
import { FlavorEntity } from '../flavors/entities/flavor.entity/flavor.entity';
import { CoffeeFlavorsResolver } from './coffee-flavor.resolver';
import { PubSubModule } from '../pub-sub/pub-sub.module';
import { FlavorsByCoffeeLoader } from './data-loader/flavors-by-coffee.loader/flavors-by-coffee.loader';

@Module({
  imports: [TypeOrmModule.forFeature([CoffeeEntity, FlavorEntity]), PubSubModule],
  providers: [CoffeeService, CoffeeResolver, CoffeeFlavorsResolver, FlavorsByCoffeeLoader],
})
export class CoffeeModule {}
