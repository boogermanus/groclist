import { Component } from '@angular/core';
import { IGroceryList, GroceryList } from './grocerylist';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { GrocListService } from './groc-list.service';

@Component({
  selector: 'groc-list',
  templateUrl: './groc-list.component.html',
  styleUrls: ['./groc-list.component.css']
})
export class GrocListComponent {
  constructor(
    private _fb:FormBuilder,
    private _service:GrocListService
    ) {
    this.formName = _fb.group({
      'listName': ['',Validators.compose([Validators.required, Validators.maxLength(50)])]
    });
    this.list = _service.getLists();
  }

  formName: FormGroup;
  list: IGroceryList[];
  
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