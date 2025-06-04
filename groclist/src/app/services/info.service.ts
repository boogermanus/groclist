import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInfo } from '../interfaces/iinfo';
import { config } from '../config';
import {IInfoItem} from "../interfaces/iinfo-item";
@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private readonly httpClient: HttpClient) { }

  public getInfo(): Observable<IInfo> {
    return this.httpClient.get<IInfo>(`${config.infoAPI}/getinfo`);
  }

  public getAllListItemsForUser(): Observable<IInfoItem[]> {
    return this.httpClient.get<IInfoItem[]>(`${config.infoAPI}/getitems`);
  }
}
