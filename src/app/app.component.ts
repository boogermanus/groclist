import { Component } from '@angular/core';
import { IGroceryList, GroceryList } from './grocerylist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  item: string;
  list: IGroceryList[] = [];
  
  getCount() : number {
    return this.list.length;
  }

  add() : void {
    this.list.push(new GroceryList(this.list.length, this.item));
  }

  delete(index: number) : void {
    this.list.splice(index, 1);
  }
}
