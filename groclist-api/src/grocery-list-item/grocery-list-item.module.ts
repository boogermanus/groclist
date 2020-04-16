import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroceryListItemService } from './grocery-list-item.service';
import { GroceryListItemController } from './grocery-list-item.controller';
import { GroceryListItem } from '../entity/GroceryListItem';
import { GroceryListService } from '../grocery-list/grocery-list.service';
import { GroceryListModule } from '../grocery-list/grocery-list.module';
import { PassportModule } from '@nestjs/passport';
import * as config from 'config';
import { GroceryList } from 'src/entity/GroceryList';

@Module({
    imports: [
        TypeOrmModule.forFeature([GroceryListItem, GroceryList]),
        PassportModule.registerAsync({useFactory: () => (config.get('passport'))}),
        GroceryListModule],
    providers: [GroceryListItemService, GroceryListService],
    controllers: [GroceryListItemController],
})
export class GroceryListItemModule {

}