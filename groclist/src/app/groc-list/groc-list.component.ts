import { Component, AfterContentInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GroceryListService } from '../services/grocery-list.service';
import { IGroceryList, GroceryList } from '../model/grocery-list';
import {AuthService} from '../auth/auth.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-groc-list',
  templateUrl: './groc-list.component.html',
  styleUrls: ['./groc-list.component.css'],
})
export class GrocListComponent implements AfterContentInit, OnDestroy {

  public formName: FormGroup;
  public groceryLists: Observable<IGroceryList[]>;
  public subscriptions: Subscription = new Subscription();
  public listName: FormControl;

  constructor(private _fb: FormBuilder,
              private _service: GroceryListService,
              private _router: Router,
              private _authService: AuthService,
    ) {
    this.listName = new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50)]));
    this.formName = this._fb.group({
      listName: this.listName
    });
  }

  public ngAfterContentInit() {
    // we always want to subscribe after the content has finished loading
    // to make sure we get the most up to date information.
    this.groceryLists = this._service.getLists();
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public add(): void {
   this.subscriptions.add(
    this._service.addList(
      new GroceryList(this.formName.controls['listName'].value, this._authService.userId()))
      .subscribe(() => this.groceryLists = this._service.getLists()));
   this.formName.reset();
   this.listName.setErrors(null);
  }

  public delete(key: IGroceryList): void {
    this.subscriptions.add(
      this._service.deleteList(key)
      .subscribe(() => this.groceryLists = this._service.getLists()));
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
