import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { jwtSecret } from '../../contstants.k';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { DatabaseModule } from '../../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.schema';
import { PasswordUtils } from '../../utils/password-utils';

// import { userProviders } from "./user.provider";

@Module({
  providers: [AuthService, JwtStrategy, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }, /*...userProviders*/
    PasswordUtils
  ],
  imports: [PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '06h' },
    })
    , TypeOrmModule.forFeature([
      User,
    ]),


  ],
  exports: [],
  controllers: [AuthController],
})
export class AuthModule {
}
