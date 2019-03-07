export interface IGroceryListItem {
    id: number;
    groceryListId: number;
    name: string;
    isCollected: boolean;
    hasCoupon: boolean;
}

export interface IGroceryList {
    id: number;
    name: string;
    createDate: Date;
    isComplete: boolean;
    items: IGroceryListItem[];
}

export class GroceryList implements IGroceryList {
    constructor(id: number, name: string, pItems?: IGroceryListItem[]) {
        this.id = id;
        this.name = name;
        this.createDate = new Date();
        this.items = pItems ? pItems : [];
    }

    public id: number;
    public name: string;
    public createDate: Date;
    public isComplete: boolean;
    public items: IGroceryListItem[] = [];
    public isSelected: boolean;
}
