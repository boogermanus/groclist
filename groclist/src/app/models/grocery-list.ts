import { IGroceryList } from "../interfaces/igrocery-list";
import { IGroceryListItem } from "../interfaces/igrocery-list-item";

export class GroceryList implements IGroceryList {
    public id: number;
    public name: string;
    public createdDate: Date;
    public isComplete: boolean;
    public userId: string;
    public items: IGroceryListItem[];

    constructor(name: string, userId: string) {
        this.name = name;
        this.userId = userId;
        this.createdDate = new Date();
        this.items = [];
    }
}
