import { ConfigService } from '@nestjs/config';
// import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

// export const dataSource = new DataSource({
//   type: 'postgres',
//   synchronize: false,
//   logging: true,
//   logger: 'simple-console',
// host: configService.get('POSTGRES_HOST'),
// port: configService.get<number>('POSTGRES_PORT'),
// username: configService.get('POSTGRES_USER'),
// password: configService.get('POSTGRES_PASSWORD'),
// database: configService.get('POSTGRES_DB'),
//   entities: [__dirname + '/src/database/entities/*.entity.ts'],
//   migrations: [__dirname + '/src/database/migrations/*.ts'],
//   //   cli: {
//   //     entitiesDir: 'src/database/entities',
//   //     migrationsDir: 'src/database/migrations',
//   //   },
// });

const settings: Record<string, unknown> = {
  type: 'postgres',
  synchronize: false,
  logging: true,
  logger: 'simple-console',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get<number>('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [__dirname + '/src/database/entities/*.entity.ts'],
  migrations: [__dirname + '/src/database/migrations/*.ts'],
  factories: [__dirname + '/src/database/seeding/factories/**/*{.ts,.js}'],
  seeds: [__dirname + '/src/database/seeding/seeds/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src/database/entities',
    migrationsDir: 'src/database/migrations',
  },
};

export = settings;
