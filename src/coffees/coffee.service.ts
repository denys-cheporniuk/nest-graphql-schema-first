import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoffeeModel } from './entities/coffee.entity/coffee.entity';
import { UserInputError } from 'apollo-server-express';
import { CreateCoffeeInputDto, UpdateCoffeeInputDto } from './dto';
import { FlavorModel } from '../flavors/entities/flavor.entity/flavor.entity';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(CoffeeModel)
    private readonly coffeesRepository: Repository<CoffeeModel>,
    @InjectRepository(FlavorModel)
    private readonly flavorsRepository: Repository<FlavorModel>,
  ) {}

  async findAll(): Promise<CoffeeModel[]> {
    return this.coffeesRepository.find();
  }

  async getOne(id: number): Promise<CoffeeModel> {
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

  async create(createCoffeeInput: CreateCoffeeInputDto): Promise<CoffeeModel> {
    const flavors = await Promise.all(
      createCoffeeInput.flavors.map((flavor) =>
        this.preloadFlavorByName(flavor),
      ),
    );

    const coffee = await this.coffeesRepository.create({
      ...createCoffeeInput,
      flavors,
    });

    return this.coffeesRepository.save(coffee);
  }

  async update(
    id: number,
    updateCoffeeInput: UpdateCoffeeInputDto,
  ): Promise<CoffeeModel> {
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

  async remove(id: number): Promise<CoffeeModel> {
    const coffee = await this.getOne(id);

    return this.coffeesRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string): Promise<FlavorModel> {
    const existingFlavor = await this.flavorsRepository.findOne({
      where: { name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorsRepository.create({ name });
  }
}
