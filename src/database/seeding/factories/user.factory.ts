import { faker } from '@faker-js/faker';
import { User } from '../../entities/user.entity';
import { define } from 'typeorm-seeding';

define(User, () => {
  const user = new User();
  user.username = faker.name.firstName() + faker.name.lastName();
  user.email = faker.internet.email();
  // password: 123456
  user.password =
    '$2b$10$s3BoAhlfs3pG4h7NvDgDYeU9XGYejavYjfXkGaQzMNRq/j24JUBSi';
  return user;
});
