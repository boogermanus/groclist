import { Component } from '@angular/core';
import { IGroceryList, GroceryList } from './grocerylist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  list: IGroceryList[] = [];
  getCount() : number {
    return this.list.length;
  }
  add(name: string) : void {
    this.list.push(new GroceryList(this.list.length, name));
  }
}
