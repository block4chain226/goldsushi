import { Module } from '@nestjs/common';
import { pgDataSource } from './datasource';

@Module({
  imports: [pgDataSource],
})
export class DatabaseModule {}
