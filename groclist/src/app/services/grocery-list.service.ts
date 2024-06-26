import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGroceryList } from '../interfaces/igrocery-list';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class GroceryListService {

  constructor(private readonly httpClient: HttpClient) { }

  public getLists(): Observable<IGroceryList[]> {
    return this.httpClient.get<IGroceryList[]>(config.groceryListAPI);
  }
}