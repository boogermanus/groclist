
import { Injectable } from '@angular/core';
import { IGroceryList, GroceryList } from './grocerylist';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class GrocListService {
    private _productURL = 'http://localhost:8090/api/groceryLists'
    list : IGroceryList[] = [
    // new GroceryList(0, "Asian Food List", 
    // [
    //   {id: 0, groceryListId: 0, itemName: 'Soy Sauce', isCollected: false }
    // ]),
    // new GroceryList(1, "Camping List",
    // [
    //   {id: 0, groceryListId: 1, itemName: 'Beef Jerky', isCollected: false},
    //   {id: 1, groceryListId: 1, itemName: 'Water', isCollected: true }
    // ])
  ];//end list

  constructor(private _http: Http) {

  }

  getLists() : Observable<IGroceryList[]> {
    return this._http.get(this._productURL)
    .map((response: Response) => <IGroceryList[]>response.json())
  }

  getList(id: number) : Observable<IGroceryList> {
      return this.getLists()
      .map((groceryList: IGroceryList[]) => groceryList.find(l => l.id === id));
  }

//   getLists() : IGroceryList[] {
//       return this.list;
//   }

//   getList(id: number) : IGroceryList {
//       return this.list.find(p => p.id === id);
//   }

  addList(newList: IGroceryList) : IGroceryList {
      this.list.push(newList);
      return newList;
  }

  deleteList(targetList: IGroceryList) : IGroceryList[] {
      let index = this.list.indexOf(targetList, 0);
      return this.list.splice(index, 1);
  }
}