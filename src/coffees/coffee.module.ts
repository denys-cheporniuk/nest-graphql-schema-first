import { Module } from '@nestjs/common';
import { CoffeeResolver } from './coffee.resolver';
import { CoffeeService } from './coffee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeModel } from './entities/coffee.entity/coffee.entity';
import { FlavorModel } from '../flavors/entities/flavor.entity/flavor.entity';
import { CoffeeFlavorsResolver } from './coffee-flavor.resolver';
import { PubSubModule } from '../pub-sub/pub-sub.module';

@Module({
  imports: [TypeOrmModule.forFeature([CoffeeModel, FlavorModel]), PubSubModule],
  providers: [CoffeeService, CoffeeResolver, CoffeeFlavorsResolver],
})
export class CoffeeModule {}
