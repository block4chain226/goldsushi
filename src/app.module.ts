import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';
import { TokenModule } from './token/token.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { IngredientsModule } from './ingredients/ingredients.module';
import { ReceipesModule } from './receipes/receipes.module';
import { ItemsModule } from './items/items.module';
import { databaseProviders } from './database/database.provider';
import { OrdersModule } from './orders/orders.module';
import { TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth/auth.guard';
import { JWTTokenExpiredFilter } from './auth/filters/token-expired.exception';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({
      storage: memoryStorage(),
    }),
    TestingModule,
    MailModule,
    DatabaseModule,
    UsersModule,
    TokenModule,
    AuthModule,
    CategoryModule,
    IngredientsModule,
    ReceipesModule,
    ItemsModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [
    databaseProviders,
    { provide: 'APP_GUARD', useClass: AuthGuard },
    {
      provide: 'APP_FILTER',
      useClass: JWTTokenExpiredFilter,
    },
  ],
})
export class AppModule {}
