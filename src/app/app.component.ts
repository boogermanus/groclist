import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  list: string[] = [];
  item: string = "new list";

  add() : void {
    this.list.push(this.item);
  }
}
