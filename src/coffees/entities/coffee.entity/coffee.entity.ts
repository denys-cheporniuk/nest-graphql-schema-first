import {
  Column, CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Coffee } from '../../../graphql';
import { FlavorEntity } from '../../../flavors/entities/flavor.entity/flavor.entity';

@Entity()
export class CoffeeEntity implements Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany(() => FlavorEntity, (flavor) => flavor.coffees, {
    cascade: true,
  })
  flavors?: FlavorEntity[];

  @CreateDateColumn()
  createdAt?: Date | null;
}
