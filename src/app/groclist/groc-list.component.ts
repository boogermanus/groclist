import { Component } from '@angular/core';
import { IGroceryList, GroceryList } from './grocerylist';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'groc-list',
  templateUrl: './groc-list.component.html',
  styleUrls: ['./groc-list.component.css']
})
export class GrocListComponent {
  constructor(private fb:FormBuilder) {
    this.formName = fb.group({
      'listName': ['',Validators.compose([Validators.required, Validators.maxLength(50)])]
    })
  }

  formName: FormGroup;
  list: IGroceryList[] = [
    new GroceryList(0, "Asian Food List", 
    [
      {id: 0, groceryListId: 0, itemName: 'Soy Sauce', isCollected: false }
    ]),
    new GroceryList(1, "Camping List",
    [
      {id: 0, groceryListId: 1, itemName: 'Beef Jerky', isCollected: false}
    ])
  ];
  
  getCount() : number {
    return this.list.length;
  }

  add() : void {
    this.list.push(new GroceryList(this.list.length, this.formName.controls.listName.value));
  }

  delete(key: IGroceryList) : void {
    var index = this.list.indexOf(key, 0);
    this.list.splice(index, 1);
  }

  select(item: GroceryList) : void {
    item.isSelected = !item.isSelected;
  }
}