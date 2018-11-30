import { Injectable } from '@angular/core';
import { IGroceryList, GroceryList, IGroceryListItem } from './grocerylist';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

@Injectable()
export class GrocListService {

  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private _http: HttpClient) {

  }

  getLists(): Observable<IGroceryList[]> {
    return this._http.get<IGroceryList[]>(environment.groceryListAPI);
  }

  getList(id: number): Observable<IGroceryList> {
    return this._http.get<IGroceryList>(environment.groceryListAPI + '/' + id);
  }

  addList(newList: IGroceryList): Observable<IGroceryList> {
    return this._http.post<IGroceryList>(environment.groceryListAPI, newList,
      {headers: this.headers});
  }

  deleteList(targetList: IGroceryList): Observable<IGroceryList> {
    return this._http.delete<IGroceryList>(environment.groceryListAPI + '/' + targetList.id,
      {headers: this.headers});
  }

  updateList(targetList: IGroceryList): Observable<IGroceryList> {
    return this._http.put<IGroceryList>(environment.groceryListAPI + '/' + targetList.id,
      this.headers);
  }

  addListItem(groceryListItem: IGroceryListItem): Observable<IGroceryListItem> {

    return this._http.post<IGroceryListItem>(environment.groceryListItemAPI, groceryListItem,
      {headers: this.headers});
  }

  deleteListItem(targetListItem: IGroceryListItem): Observable<IGroceryListItem> {
    return this._http.delete<IGroceryListItem>(environment.groceryListItemAPI + '/' + targetListItem.id,
     {headers: this.headers});
  }

  updateListItem(targetListItem: IGroceryListItem): Observable<IGroceryListItem> {

    return this._http.put<IGroceryListItem>(environment.groceryListItemAPI + '/' + targetListItem.id,
      targetListItem, {headers: this.headers});
  }
}