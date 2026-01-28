import { IGroceryListItem } from "./igrocery-list-item";
import {IGroceryListUser} from "./igrocery-list-user";

export interface IGroceryList {
    id: number;
    name: string;
    createdDate: Date;
    isComplete: boolean;
    userId: string;
    items: IGroceryListItem[];
    users?: IGroceryListUser[];
}
