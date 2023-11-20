import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { FlavorEntity } from '../../../flavors/entities/flavor.entity/flavor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CoffeeEntity } from '../../entities/coffee.entity/coffee.entity';
import { In, Repository } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class FlavorsByCoffeeLoader extends DataLoader<number, FlavorEntity[]> {
  constructor(
    @InjectRepository(CoffeeEntity)
    private readonly coffeesRepository: Repository<CoffeeEntity>,
  ) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(
    coffeeIds: readonly number[],
  ): Promise<FlavorEntity[][]> {
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
