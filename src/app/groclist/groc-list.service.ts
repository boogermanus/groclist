
import { Injectable } from '@angular/core';
import { IGroceryList, GroceryList } from './grocerylist';

@Injectable()
export class GrocListService {
    list : IGroceryList[] = [
    new GroceryList(0, "Asian Food List", 
    [
      {id: 0, groceryListId: 0, itemName: 'Soy Sauce', isCollected: false }
    ]),
    new GroceryList(1, "Camping List",
    [
      {id: 0, groceryListId: 1, itemName: 'Beef Jerky', isCollected: false},
      {id: 1, groceryListId: 1, itemName: 'Water', isCollected: false }
    ])
  ];//end list

  getLists() : IGroceryList[] {
      return this.list;
  }
}