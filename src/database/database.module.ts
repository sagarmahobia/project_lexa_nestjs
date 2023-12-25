import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'process';
import { User } from '../module/auth/entities/user.schema';

@Module({
  imports: [

    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'Lexa@123',
        database: process.env.DB_NAME || 'lexa',
        entities: [User],
        synchronize: true,

      },
    ),
  ],
})
export class DatabaseModule {
}
