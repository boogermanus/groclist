import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroceryListService } from './grocery-list.service';
import { GroceryListController } from './grocery-list.controller';
import { GroceryList } from '../entity/GroceryList';
import { PassportModule } from '@nestjs/passport';
import * as config from 'config';
@Module({
  imports: [TypeOrmModule.forFeature([GroceryList]),
  PassportModule.registerAsync({useFactory: () => (config.get('passport'))})],
  providers: [GroceryListService],
  controllers: [GroceryListController],
})
export class GroceryListModule {}