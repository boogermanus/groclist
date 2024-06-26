import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGroceryList } from '../interfaces/igrocery-list';
import { config } from '../config';
import { IGroceryListItem } from '../interfaces/igrocery-list-item';

@Injectable({
  providedIn: 'root'
})
export class GroceryListService {

  constructor(private readonly httpClient: HttpClient) { }

  public getLists(): Observable<IGroceryList[]> {
    return this.httpClient.get<IGroceryList[]>(config.groceryListAPI);
  }

  public getList(id: number): Observable<IGroceryList> {
    return this.httpClient.get<IGroceryList>(`${config.groceryListAPI}/${id}`);
  }

  public addList(groceryList: IGroceryList) {
    return this.httpClient.post<IGroceryList>(config.groceryListAPI, groceryList);
  }

  public deleteList(groceryList: IGroceryList) {
    return this.httpClient.delete<IGroceryList>(`${config.groceryListAPI}/${groceryList.id}`);
  }

  public updateList(targetList: IGroceryList): Observable<IGroceryList> {
    return this.httpClient.put<IGroceryList>(`${config.groceryListAPI}/${targetList.id}`, targetList);
  }

  public addListItem(groceryListItem: IGroceryListItem): Observable<IGroceryListItem> {
    return this.httpClient.post<IGroceryListItem>(config.groceryListItemAPI, groceryListItem);
  }

  public deleteListItem(groceryListItem: IGroceryListItem): Observable<IGroceryListItem> {
    return this.httpClient.delete<IGroceryListItem>(`${config.groceryListItemAPI}/${groceryListItem.id}`)
  }

  public updateListItem(groceryListItem: IGroceryListItem): Observable<IGroceryListItem> {

    return this.httpClient.put<IGroceryListItem>(`${config.groceryListItemAPI}/${groceryListItem.id}`,groceryListItem);
  }

  public suggestListItem(pValue: string): Observable<IGroceryListItem[]> {
    const params = new HttpParams()
      .append('text', pValue);

    return this.httpClient.get<IGroceryListItem[]>(config.groceryListItemAPI + '/', { params })
  }

}
