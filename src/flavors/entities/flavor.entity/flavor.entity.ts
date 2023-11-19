import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Flavor } from '../../../graphql';
import { CoffeeModel } from '../../../coffees/entities/coffee.entity/coffee.entity';

@Entity()
export class FlavorModel implements Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => CoffeeModel, (coffee) => coffee.flavors)
  coffees: CoffeeModel[];
}
