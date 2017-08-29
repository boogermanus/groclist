import { Injectable } from '@angular/core';
import { IGroceryList, GroceryList, IGroceryListItem } from './grocerylist';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

@Injectable()
export class GrocListService {

  constructor(private _http: Http) {

  }

  getLists() : Observable<IGroceryList[]> {
    return this._http.get(environment.groceryListAPI)
    .map((response: Response) => <IGroceryList[]>response.json())
  }

  getList(id: number) : Observable<IGroceryList> {
    return this._http.get(environment.groceryListAPI + '/' + id)
    .map((response: Response) => <IGroceryList>response.json());
  }

  addList(newList: IGroceryList) : Observable<IGroceryList> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this._http.post(environment.groceryListAPI,{name: newList.name}, options)
    .map((response: Response) => <IGroceryList>response.json());
  }

  deleteList(targetList: IGroceryList) : Observable<IGroceryList> {
    return this._http.delete(environment.groceryListAPI + '/' + targetList.id)
    .map((response: Response) => <IGroceryList>response.json());
  }

  updateList(targetList: IGroceryList) : Observable<IGroceryList> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this._http.put(environment.groceryListAPI + '/' + targetList.id,
      {isListComplete:targetList.isListComplete}, options)
    .map((response:Response) => <IGroceryList>response.json());
  }

  addListItem(groceryListItem: IGroceryListItem) : Observable<IGroceryListItem> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    
    return this._http.post(environment.groceryListItemAPI, 
    {
      itemName: groceryListItem.itemName,
      groceryListId: groceryListItem.groceryListId
    }, options)
    .map((response: Response) => <IGroceryListItem>response.json())
  }

  deleteListItem(targetListItem: IGroceryListItem) : Observable<IGroceryListItem> {
    return this._http.delete(environment.groceryListItemAPI+ '/' + targetListItem.id)
    .map((response: Response) => <IGroceryListItem>response.json());
  }

  updateListItem(targetListItem: IGroceryListItem): Observable<IGroceryListItem> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this._http.put(environment.groceryListItemAPI+ '/' + targetListItem.id,
    {
      isCollected: targetListItem.isCollected
    }, options)
    .map((response: Response) => <IGroceryListItem>response.json());
  }
}