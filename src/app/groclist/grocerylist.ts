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
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.createDate = new Date();
    }

    id: number;
    name: string;
    createDate: Date;
    isListComplete: boolean;
    items: IGroceryListItem[] = [];
    isSelected: boolean;
}