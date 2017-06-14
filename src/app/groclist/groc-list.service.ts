import { Injectable } from '@angular/core';
import { IGroceryList, GroceryList } from './grocerylist';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class GrocListService {
  private _productURL = 'http://localhost:8090/api/groceryLists'

  constructor(private _http: Http) {

  }

  getLists() : Observable<IGroceryList[]> {
    return this._http.get(this._productURL)
    .map((response: Response) => <IGroceryList[]>response.json())
  }

  getList(id: number) : Observable<IGroceryList> {
    return this._http.get(this._productURL + '/' + id)
    .map((response: Response) => <IGroceryList>response.json());
  }

  addList(newList: IGroceryList) : Observable<IGroceryList> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this._http.post(this._productURL,{name: newList.name}, options)
    .map((response: Response) => <IGroceryList>response.json());
  }

  deleteList(targetList: IGroceryList) : Observable<IGroceryList> {
    return this._http.delete(this._productURL + '/' + targetList.id)
    .map((response: Response) => <IGroceryList>response.json());
  }
}