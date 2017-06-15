import { Injectable } from '@angular/core';
import { IGroceryList, GroceryList, IGroceryListItem } from './grocerylist';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class GrocListService {
  private _groceryListAPI = 'http://permutate.us:8090/api/groceryLists';
  private _groceryListItemAPI = 'http://permutate.us:8090/api/groceryListItems';

  constructor(private _http: Http) {

  }

  getLists() : Observable<IGroceryList[]> {
    return this._http.get(this._groceryListAPI)
    .map((response: Response) => <IGroceryList[]>response.json())
  }

  getList(id: number) : Observable<IGroceryList> {
    return this._http.get(this._groceryListAPI + '/' + id)
    .map((response: Response) => <IGroceryList>response.json());
  }

  addList(newList: IGroceryList) : Observable<IGroceryList> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this._http.post(this._groceryListAPI,{name: newList.name}, options)
    .map((response: Response) => <IGroceryList>response.json());
  }

  deleteList(targetList: IGroceryList) : Observable<IGroceryList> {
    return this._http.delete(this._groceryListAPI + '/' + targetList.id)
    .map((response: Response) => <IGroceryList>response.json());
  }

  addListItem(groceryListItem: IGroceryListItem) : Observable<IGroceryListItem> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    
    return this._http.post(this._groceryListItemAPI, 
    {
      itemName: groceryListItem.itemName,
      groceryListId: groceryListItem.groceryListId
    }, options)
    .map((response: Response) => <IGroceryListItem>response.json())
  }

  deleteListItem(targetListItem: IGroceryListItem) : Observable<IGroceryListItem> {
    return this._http.delete(this._groceryListItemAPI + '/' + targetListItem.id)
    .map((response: Response) => <IGroceryListItem>response.json());
  }

  updateListItem(targetListItem: IGroceryListItem): Observable<IGroceryListItem> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this._http.put(this._groceryListItemAPI + '/' + targetListItem.id,
    {
      isCollected: targetListItem.isCollected
    }, options)
    .map((response: Response) => <IGroceryListItem>response.json());
  }
}