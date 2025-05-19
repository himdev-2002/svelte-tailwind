import { fakerID_ID as faker } from '@faker-js/faker';
import { generateMock } from '@anatine/zod-mock';
import { AuthUser, type AuthUserType } from '../schema/user';
import { mockeryMapper } from '../schema/helpers';
import type { z } from 'zod';

export const generateRandomUser = ():AuthUserType => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email({provider: 'telkomsigma.co.id'}).toLowerCase(),
  password: faker.internet.password({ length: 8 }),
  roles: faker.helpers.uniqueArray(['admin', 'user', 'staff'],2),
  profilePicture: faker.image.avatar(),
  status: faker.helpers.arrayElement(['active', 'inactive', 'suspended']),
  preferences: {
    theme: faker.helpers.arrayElement(['light', 'dark']),
    lang: faker.helpers.arrayElement(['en', 'id']),
  },
  lastLogin: faker.date.past()
});

export function createRandomUser() {
  // return {
  //   userId: faker.string.uuid(),
  //   username: faker.internet.username(), // before version 9.1.0, use userName()
  //   email: faker.internet.email(),
  //   avatar: faker.image.avatar(),
  //   password: faker.internet.password(),
  //   birthdate: faker.date.birthdate(),
  //   registeredAt: faker.date.past(),
  // };
  return generateMock(AuthUser,{faker,
    stringMap: {
      id: () => faker.string.uuid(),
      name: () => faker.person.fullName(),
      email: () => faker.internet.email({provider: 'telkomsigma.co.id'}).toLowerCase(),
      password: () => faker.internet.password({ length: 8 }),
      // roles: faker.helpers.uniqueArray(['admin', 'user', 'staff'],2),
      profilePicture: () => faker.image.avatar(),
      status: () => faker.helpers.arrayElement(['active', 'inactive', 'suspended'])
    },
    mockeryMapper
  });
}

export const users = faker.helpers.multiple(createRandomUser, {
  count: 5,
});

export const users2 = faker.helpers.multiple(generateRandomUser, {
  count: 5,
});