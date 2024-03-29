import { Injectable } from '@angular/core';
import { IGroceryList } from '../model/grocery-list';
import { IGroceryListItem } from '../model/grocery-list.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroceryListService {

  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private _http: HttpClient) {

  }

  public getLists(): Observable<IGroceryList[]> {
    return this._http.get<IGroceryList[]>(environment.groceryListAPI);
  }

  public getList(id: number): Observable<IGroceryList> {
    return this._http.get<IGroceryList>(environment.groceryListAPI + '/' + id);
  }

  public addList(newList: IGroceryList): Observable<IGroceryList> {
    return this._http.post<IGroceryList>(environment.groceryListAPI, newList,
      {headers: this.headers});
  }

  public deleteList(targetList: IGroceryList): Observable<IGroceryList> {
    return this._http.delete<IGroceryList>(environment.groceryListAPI + '/' + targetList.id,
      {headers: this.headers});
  }

  public updateList(targetList: IGroceryList): Observable<IGroceryList> {
    return this._http.put<IGroceryList>(environment.groceryListAPI + '/' + targetList.id,
      targetList, {headers: this.headers});
  }

  public addListItem(groceryListItem: IGroceryListItem): Observable<IGroceryListItem> {

    return this._http.post<IGroceryListItem>(environment.groceryListItemAPI, groceryListItem,
      {headers: this.headers});
  }

  public deleteListItem(targetListItem: IGroceryListItem): Observable<IGroceryListItem> {
    return this._http.delete<IGroceryListItem>(environment.groceryListItemAPI + '/' + targetListItem.id,
     {headers: this.headers});
  }

  public updateListItem(targetListItem: IGroceryListItem): Observable<IGroceryListItem> {

    return this._http.put<IGroceryListItem>(environment.groceryListItemAPI + '/' + targetListItem.id,
      targetListItem, {headers: this.headers});
  }

  public suggestListItem(pValue: string): Observable<IGroceryListItem[]> {
    const params = new HttpParams()
      .append('text', pValue);
    return this._http.get<IGroceryListItem[]>(environment.groceryListItemAPI + '/', {params, headers: this.headers});
  }
}
