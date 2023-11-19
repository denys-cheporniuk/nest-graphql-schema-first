import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { FlavorModel } from '../../../flavors/entities/flavor.entity/flavor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CoffeeModel } from '../../entities/coffee.entity/coffee.entity';
import { In, Repository } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class FlavorsByCoffeeLoader extends DataLoader<number, FlavorModel[]> {
  constructor(
    @InjectRepository(CoffeeModel)
    private readonly coffeesRepository: Repository<CoffeeModel>,
  ) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(
    coffeeIds: readonly number[],
  ): Promise<FlavorModel[][]> {
    const coffeesWithFlavors = await this.coffeesRepository.find({
      select: ['id'],
      relations: ['flavors'],
      where: {
        id: In(coffeeIds as number[]),
      },
    });

    return coffeesWithFlavors.map((coffee) => coffee.flavors);
  }
}
