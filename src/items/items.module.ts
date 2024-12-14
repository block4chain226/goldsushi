import { Module } from "@nestjs/common";
import { ItemsService } from "./items.service";
import { ItemsController } from "./items.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "./entities/items.entity";
import { StorageModule } from "../storage/storage.module";
import { DatabaseModule } from "../database/database.module";
import { databaseProviders } from "../database/database.provider";

@Module({
  imports: [TypeOrmModule.forFeature([Item]), StorageModule, DatabaseModule, StorageModule],
  controllers: [ItemsController],
  providers: [ItemsService]
})
export class ItemsModule {
}
