import { Controller, Post, Body, UseGuards, Delete, Param, Put, Get, Query} from '@nestjs/common';
import { GroceryListItemService } from './grocery-list-item.service';
import { AuthGuard } from '@nestjs/passport';
import { GroceryListItemDTO } from '../DTO/grocery-list-item.dto';

@Controller('api/groceryListItem')
export class GroceryListItemController {

    constructor(
        private readonly _groceryListItemService: GroceryListItemService,
    ) {}

    @Post()
    @UseGuards(AuthGuard())
    public async insertGroceryListItem(@Body() pBody: GroceryListItemDTO) {
        return await this._groceryListItemService.create(pBody);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    public async deleteGroceryListItem(@Param() pId) {
        return await this._groceryListItemService.delete(pId);
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    public async updateGroceryListItem(@Param() pId, @Body() pBody) {
        return await this._groceryListItemService.update(pId, pBody.isCollected);
    }

    @Get()
    @UseGuards(AuthGuard())
    public async suggestGroceryListItem(@Query() pQuery) {
        return await this._groceryListItemService.suggest(pQuery.text);
    }
}