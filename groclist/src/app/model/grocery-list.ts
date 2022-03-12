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

    constructor(name: string, userId: string, pItems?: IGroceryListItem[]) {
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
