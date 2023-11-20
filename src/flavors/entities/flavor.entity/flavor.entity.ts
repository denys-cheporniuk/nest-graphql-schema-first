import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Flavor } from '../../../graphql';
import { CoffeeEntity } from '../../../coffees/entities/coffee.entity/coffee.entity';

@Entity()
export class FlavorEntity implements Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => CoffeeEntity, (coffee) => coffee.flavors)
  coffees: CoffeeEntity[];
}
