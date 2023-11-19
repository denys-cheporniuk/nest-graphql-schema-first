import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { CoffeeModule } from './coffees/coffee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlavorsModule } from './flavors/flavors.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
    }),
    CoffeeModule,
    FlavorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
