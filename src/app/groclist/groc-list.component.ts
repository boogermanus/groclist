import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'

import { GrocListService } from './groc-list.service';
import { IGroceryList, GroceryList } from './grocerylist';

@Component({
  selector: 'groc-list',
  templateUrl: './groc-list.component.html',
  styleUrls: ['./groc-list.component.css']
})
export class GrocListComponent {
  constructor(private _fb:FormBuilder,
              private _service:GrocListService,
              private _router:Router
    ) {
    this.formName = _fb.group({
      'listName': ['',Validators.compose([Validators.required, Validators.maxLength(50)])]
    });
    _service.getLists().subscribe(lists => this.list = lists);
  }

  formName: FormGroup;
  list: IGroceryList[];
  
  getCount() : number {
    return this.list.length;
  }

  add() : void {
   this._service.addList(
      new GroceryList(this.list.length, this.formName.controls.listName.value));
  }

  delete(key: IGroceryList) : void {
    this._service.deleteList(key);
  }

  select(item: GroceryList) : void {
    item.isSelected = !item.isSelected;
  }

  view(item: IGroceryList) : void {
    this._router.navigate(['/groclist', item.id]);
  }
}