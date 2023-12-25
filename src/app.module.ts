import { Logger, Module, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ConfigModule } from '@nestjs/config';
import { ClusterService } from './cluster.service';
import { AuthModule } from './module/auth/auth.module';
import * as process from 'process';
import { DatabaseModule } from './database/database.module';
import { PasswordUtils } from './utils/password-utils';

const validationPipeProvider = {
  provide: 'APP_PIPE',
  useClass: ValidationPipe,
};

const httpExceptionFilterProvider = {
  provide: 'APP_FILTER',
  useClass: HttpExceptionFilter,
};


const loggerProvider = {
  provide: Logger,
  useFactory: () => {
    return new Logger('Project Lexa');
  },
};

@Module({
  imports: [AuthModule,

    ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: `${process.env.NODE_ENV}.env`,
      },
    ),
    DatabaseModule,
  ],
  controllers: [],
  providers: [loggerProvider, validationPipeProvider, httpExceptionFilterProvider, ClusterService, PasswordUtils],
})
export class AppModule {
}

