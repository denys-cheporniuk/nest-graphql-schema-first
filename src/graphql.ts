
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateCoffeeInput {
    name: string;
    brand: string;
    flavors: string[];
}

export class UpdateCoffeeInput {
    name?: Nullable<string>;
    brand?: Nullable<string>;
    flavors?: Nullable<string[]>;
}

export class Coffee {
    id: number;
    name: string;
    brand: string;
    flavors?: Nullable<Flavor[]>;
    createdAt?: Nullable<Date>;
}

export abstract class IQuery {
    coffees: Coffee[];
    coffee?: Nullable<Coffee>;
}

export abstract class IMutation {
    createCoffee?: Nullable<Coffee>;
    updateCoffee?: Coffee;
    removeCoffee?: Coffee;
}

export class Flavor {
    id: number;
    name: string;
}

type Nullable<T> = T | null;
