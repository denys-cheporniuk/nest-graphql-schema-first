import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Coffee } from '../../../graphql';
import { FlavorModel } from '../../../flavors/entities/flavor.entity/flavor.entity';

@Entity()
export class CoffeeModel implements Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany(() => FlavorModel, (flavor) => flavor.coffees, {
    cascade: true,
  })
  flavors?: FlavorModel[];
}
