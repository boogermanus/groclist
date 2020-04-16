import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, DeleteResult} from 'typeorm';
import {GroceryList} from '../entity/GroceryList';

@Injectable()
export class GroceryListService {
    constructor(
        @InjectRepository(GroceryList)
        private readonly _groceryListRepository: Repository<GroceryList>,
    ) {}

    public async findAll(): Promise<GroceryList[]> {
        return await this._groceryListRepository.find( {
            relations: ['items'],
            where: { isComplete: false},
        });
    }

    public async findOne(id: number): Promise<GroceryList> {
        return await this._groceryListRepository.findOne(id, {
            relations: ['items'],
        });
    }

    public async create(pName: string): Promise<GroceryList> {
        const groceryList = new GroceryList(pName);
        return this._groceryListRepository.save(groceryList);
    }

    public async update(pId: number, pIsComplete: boolean): Promise<GroceryList> {
        const record = await this._groceryListRepository.findOneOrFail(pId);
        record.isComplete = pIsComplete;
        return await this._groceryListRepository.save(record);
    }

    public async delete(pId: number): Promise<DeleteResult> {
        return await this._groceryListRepository.delete(pId);
    }
}