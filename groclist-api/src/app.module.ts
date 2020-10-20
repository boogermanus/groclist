import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';
import { AuthModule } from './auth/auth.module';
import { GroceryListItemModule } from './grocery-list-item/grocery-list-item.module';
import { GroceryListModule } from './grocery-list/grocery-list.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    // AuthModule,
    // GroceryListModule,
    // GroceryListItemModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
