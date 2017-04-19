import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  list: string[] = [];
  item: string = "new list";
  count: number = 0;

  add() : void {
    this.count++;
    this.list.push(this.item);
  }
}
