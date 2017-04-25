
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

  getList(id: number) : IGroceryList {
      return this.list.find(p => p.id === id);
  }

  addList(newList: IGroceryList) : IGroceryList {
      this.list.push(newList);
      return newList;
  }

  deleteList(targetList: IGroceryList) : IGroceryList[] {
      let index = this.list.indexOf(targetList, 0);
      return this.list.splice(index, 1);
  }
}