import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailModule,
    DatabaseModule,
    UsersModule,
    TokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
