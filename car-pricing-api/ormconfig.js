import { DataSource } from 'typeorm';
require('dotenv').config();

const environment = process.env.NODE_ENV || 'development';

const dbConfig = new DataSource({
  type: 'sqlite',
  driver: 'sqlite',
  database:
    environment === 'development' ? 'car_pricing.sqlite' : 'test.sqlite',
  entities: [`**/**/*.entity.${environment === 'development' ? 'js' : 'ts'}`],
  synchronize: false,
  migrations: ['migrations/*.{ts,js}'],
  cli: {
    migrationsDir: __dirname + '../../migrations',
  },
});

// switch (process.env.NODE_ENV) {
//   case 'development':
//     console.log(environment);
//     Object.assign(
//       dbConfig,
//       new DataSource({
//         type: 'sqlite',
//         database: 'car_pricing.sqlite',
//         entities: ['**/*.entitiy.{ts,js}'],
//       }),
//     );
//   case 'test':
//     Object.assign(dbConfig, {
//       type: 'sqlite',
//       database: 'test.sqlite',
//       entities: ['**/*.entitiy.{ts,js}'],
//     });
//   case 'production':
//     break;
//   default:
//     throw new Error('NODE_ENV is not defined');
// }

export default dbConfig;
