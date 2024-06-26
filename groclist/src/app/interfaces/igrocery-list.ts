import { IGroceryListItem } from "./igrocery-list-item";

export interface IGroceryList {
    id: number;
    name: string;
    createdDate: Date;
    isComplete: boolean;
    userId: string;
    items: IGroceryListItem[];
}