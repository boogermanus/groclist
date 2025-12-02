import {IGroceryListUser} from "../interfaces/igrocery-list-user";

export class GroceryListUser implements IGroceryListUser {
  public id: number;
  public groceryListId: number;
  public userId: string;
  public userName: string;

  constructor(groceryListId: number, userName: string) {
    this.groceryListId = groceryListId;
    this.userId = userName;
  }
}
