/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { z, type ZodType } from "zod";
import { type Faker } from '@faker-js/faker';

export function uniqueArray(schema: ZodType) {
    return z
        .array(schema)
        .refine((items) => new Set(items).size === items.length, {
            message: 'All items must be unique, no duplicate values allowed',
        });
}

export type FakerFunction = () => string | number | boolean | Date;

export type MockeryMapper = (
    keyName: string,
    fakerInstance: Faker
  ) => FakerFunction | undefined;
  
  export function mockeryMapper(
    keyName: string,
    fakerInstance: Faker
  ): FakerFunction | undefined {
    const keyToFnMap: Record<string, FakerFunction> = {
      image: fakerInstance.image.url,
      imageurl: fakerInstance.image.url,
      number: fakerInstance.number.int,
      float: fakerInstance.number.float,
      hexadecimal: fakerInstance.number.hex,
      uuid: fakerInstance.string.uuid,
      boolean: fakerInstance.datatype.boolean,
      city: fakerInstance.location.city,
    };
  
    return keyName && keyName.toLowerCase() in keyToFnMap
      ? keyToFnMap[keyName.toLowerCase() as never]
      : undefined;
  }