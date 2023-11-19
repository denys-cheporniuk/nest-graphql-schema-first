import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<number, Date> {
  description = 'Date custom scalar type';

  parseValue(value: number): Date {
    return new Date(value);
  }

  serialize(value: Date): number {
    console.log(`Serialising: ${value}`);
    return value.getTime();
  }

  parseLiteral(ast: ValueNode): Date {
    return ast.kind === Kind.INT ? new Date(ast.value) : null;
  }
}
