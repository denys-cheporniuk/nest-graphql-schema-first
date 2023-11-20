import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoffeeEntity } from './entities/coffee.entity/coffee.entity';
import { UserInputError } from 'apollo-server-express';
import { CreateCoffeeInputDto, UpdateCoffeeInputDto } from './dto';
import { FlavorEntity } from '../flavors/entities/flavor.entity/flavor.entity';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(CoffeeEntity)
    private readonly coffeesRepository: Repository<CoffeeEntity>,
    @InjectRepository(FlavorEntity)
    private readonly flavorsRepository: Repository<FlavorEntity>,
    private readonly pubSub: PubSub,
  ) {}

  async findAll(): Promise<CoffeeEntity[]> {
    return this.coffeesRepository.find();
  }

  async getOne(id: number): Promise<CoffeeEntity> {
    const coffee = await this.coffeesRepository.findOne({
      where: {
        id,
      },
    });

    if (!coffee) {
      throw new UserInputError(`Coffee ${id} does not exist`);
    }

    return coffee;
  }

  async create(createCoffeeInput: CreateCoffeeInputDto): Promise<CoffeeEntity> {
    const flavors = await Promise.all(
      createCoffeeInput.flavors.map((flavor) =>
        this.preloadFlavorByName(flavor),
      ),
    );

    const coffee = await this.coffeesRepository.create({
      ...createCoffeeInput,
      flavors,
    });

    const newCoffeeEntity = await this.coffeesRepository.save(coffee);
    this.pubSub.publish('coffeeAdded', { coffeeAdded: newCoffeeEntity });

    return newCoffeeEntity;
  }

  async update(
    id: number,
    updateCoffeeInput: UpdateCoffeeInputDto,
  ): Promise<CoffeeEntity> {
    let flavors;

    if (updateCoffeeInput.flavors) {
      flavors = await Promise.all(
        updateCoffeeInput.flavors.map((flavor) =>
          this.preloadFlavorByName(flavor),
        ),
      );
    }

    const coffee = await this.coffeesRepository.preload({
      id: Number(id),
      ...updateCoffeeInput,
      flavors,
    });

    if (!coffee) {
      throw new UserInputError(`Coffee #${id} does not exist`);
    }

    return this.coffeesRepository.save(coffee);
  }

  async remove(id: number): Promise<CoffeeEntity> {
    const coffee = await this.getOne(id);

    return this.coffeesRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string): Promise<FlavorEntity> {
    const existingFlavor = await this.flavorsRepository.findOne({
      where: { name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorsRepository.create({ name });
  }
}
