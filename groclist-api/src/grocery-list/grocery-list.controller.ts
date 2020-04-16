import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards} from '@nestjs/common';
import { GroceryListService } from './grocery-list.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/groceryLists')
export class GroceryListController {

    constructor(
        private readonly _groceryListService: GroceryListService) {

    }

    @Get()
    @UseGuards(AuthGuard())
    public async getGroceryLists() {
        return await this._groceryListService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard())
    public async getGroceryList(@Param() id) {
        return await this._groceryListService.findOne(id);
    }

    @Post()
    @UseGuards(AuthGuard())
    public async insertGroceryList(@Body() pBody) {
        const groceryList = await this._groceryListService.create(pBody.name);
        return groceryList;
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    public async updateGroceryList(@Param() pId, @Body() pBody) {
        return await this._groceryListService.update(pId, pBody.isComplete);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    public async deleteGroceryList(@Param() pId) {
        return await this._groceryListService.delete(pId);
    }

}
