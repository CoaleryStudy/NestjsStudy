import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { LoggerMiddleWare } from './logger.middleware';
import { UserModule } from './users/users.module';

@Module({
  imports: [CatsModule, TypeOrmModule.forRoot(), UserModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleWare)
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
