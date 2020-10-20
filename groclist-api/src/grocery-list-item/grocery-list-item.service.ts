import {Injectable, HttpException, HttpStatus} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, DeleteResult, UpdateResult, QueryBuilder} from 'typeorm';
import { GroceryListItem } from '../entity/GroceryListItem';
import { GroceryListItemDTO } from '../DTO/grocery-list-item.dto';
import { GroceryListService } from '../grocery-list/grocery-list.service';
import { pathToFileURL } from 'url';

@Injectable()
export class GroceryListItemService {

    constructor(
        @InjectRepository(GroceryListItem)
        private readonly _groceryListItemRepository: Repository<GroceryListItem>,
        private readonly _groceryListService: GroceryListService,
    ) {}

    public async create(pDTO: GroceryListItemDTO): Promise<GroceryListItem> {
        const groceryList = await this._groceryListService.findOne(pDTO.groceryListId);

        if (!groceryList)
            throw new HttpException(`Cannot found Grocery List ${pDTO.groceryListId}`, HttpStatus.NOT_FOUND);

        const groceryListItem = new GroceryListItem();
        groceryListItem.name = pDTO.name;
        groceryListItem.isCollected = false;
        groceryListItem.groceryList = groceryList
        groceryListItem.hasCoupon = pDTO.hasCoupon || false;
        return await this._groceryListItemRepository.save(groceryListItem);
    }

    public async delete(pId: number): Promise<DeleteResult> {
        return await this._groceryListItemRepository.delete(pId);
    }

    public async update(pId: number, pIsCollected: boolean): Promise<UpdateResult> {
        return await this._groceryListItemRepository.update(pId, {isCollected: pIsCollected});
    }

    public async suggest(pText: string): Promise<string[]> {
        const queryBuilder = this._groceryListItemRepository
            .createQueryBuilder('grocery_list_item');
        return await queryBuilder
            // as being used to avoid changes to angular model.
            .select('distinct grocery_list_item.name as grocery_list_item_name')
            .where('name like :name', { name: `${pText}%` })
            .take(5)
            .getRawMany();
    }
}