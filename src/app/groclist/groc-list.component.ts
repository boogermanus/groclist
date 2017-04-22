import { Component } from '@angular/core';
import { IGroceryList, GroceryList } from './grocerylist';

@Component({
  selector: 'groc-list',
  templateUrl: './groc-list.component.html',
  styleUrls: ['./groc-list.component.css']
})
export class GrocListComponent {
  item: string;
  list: IGroceryList[] = [
    new GroceryList(0, "Asian Food List"),
    new GroceryList(1, "Camping List")
  ];
  
  getCount() : number {
    return this.list.length;
  }

  add() : void {
    this.list.push(new GroceryList(this.list.length, this.item));
  }

  delete(key: IGroceryList) : void {
    var index = this.list.indexOf(key, 0);
    this.list.splice(index, 1);
  }
}