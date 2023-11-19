import { Module } from '@nestjs/common';
import { CoffeeResolver } from './coffee.resolver';
import { CoffeeService } from './coffee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeModel } from './entities/coffee.entity/coffee.entity';
import { FlavorModel } from '../flavors/entities/flavor.entity/flavor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoffeeModel, FlavorModel])],
  providers: [CoffeeResolver, CoffeeService],
})
export class CoffeeModule {}
