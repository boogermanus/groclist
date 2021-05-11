import {IGroceryListItem} from './grocery-list.interface';

export interface IGroceryList {
    id: number;
    name: string;
    createdDate: Date;
    isComplete: boolean;
    userId: string;
    items: IGroceryListItem[];
}

export class GroceryList implements IGroceryList {

    constructor(id: number, name: string, userId: string, pItems?: IGroceryListItem[]) {
        this.id = id;
        this.name = name;
        this.createdDate = new Date();
        this.items = pItems ? pItems : [];
        this.userId = userId;
    }

    public id: number;
    public name: string;
    public createdDate: Date;
    public isComplete: boolean;
    public items: IGroceryListItem[] = [];
    public userId: string;
    public isSelected: boolean;
}
