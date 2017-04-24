export interface IGroceryListItem {
    id: number;
    groceryListId: number;
    itemName: string;
    isCollected: boolean;
}

export interface IGroceryList {
    id: number;
    name: string;
    createDate: Date;
    isListComplete: boolean;
    items: IGroceryListItem[];
}

export class GroceryList implements IGroceryList {
    constructor(id: number, name: string, items?:IGroceryListItem[]) {
        this.id = id;
        this.name = name;
        this.createDate = new Date();
        this.items = items;
    }

    id: number;
    name: string;
    createDate: Date;
    isListComplete: boolean;
    items: IGroceryListItem[] = [];
    isSelected: boolean;
}