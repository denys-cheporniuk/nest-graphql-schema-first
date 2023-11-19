import { IsOptional, MinLength } from 'class-validator';
import { UpdateCoffeeInput } from '../../../graphql';

export class UpdateCoffeeInputDto extends UpdateCoffeeInput {
  @IsOptional()
  @MinLength(3)
  name: string;
}
