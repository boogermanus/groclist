import { Component, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GrocListService } from '../services/groc-list.service';
import { IGroceryList, GroceryList } from '../model/grocery-list';

@Component({
  selector: 'groc-list',
  templateUrl: './groc-list.component.html',
  styleUrls: ['./groc-list.component.css'],
})
export class GrocListComponent implements AfterContentInit {
  constructor(private _fb: FormBuilder,
              private _service: GrocListService,
              private _router: Router,
    ) {
    this.formName = this._fb.group({
      listName: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
    });
  }

  public formName: FormGroup;
  public list: IGroceryList[];

  public ngAfterContentInit() {
    // we always want to subscribe after the content has finished loading
    // to make sure we get the most up to date information.
    this._service.getLists().subscribe(lists => this.list = lists);
  }

  public getCount(): number {
    return this.list.length;
  }

  public add(): void {
   this._service.addList(
      new GroceryList(this.list.length, this.formName.controls.listName.value))
      .subscribe(newList => {
        newList.items = [];
        this.list.push(newList);
      });
   this.formName.reset();
  }

  public delete(key: IGroceryList): void {
    this._service.deleteList(key)
    .subscribe(deleted => {
      const index = this.list.indexOf(key);
      this.list.splice(index, 1);
    });
  }

  public view(item: IGroceryList): void {
    this._router.navigate(['/list', item.id]);
  }

  public changePassword(): void {
    this._router.navigate(['/login'], {queryParams: {changePassword: true}});
  }

  public logout(): void {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}
