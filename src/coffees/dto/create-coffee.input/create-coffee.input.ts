import { MinLength } from 'class-validator';
import { CreateCoffeeInput } from '../../../graphql';

export class CreateCoffeeInputDto extends CreateCoffeeInput {
  @MinLength(3)
  name: string;
}
