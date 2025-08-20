import {Component, inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IInfoItem} from "../../interfaces/iinfo-item";
import {AsyncPipe} from "@angular/common";
import {InfoService} from '../../services/info.service';

@Component({
  standalone: true,
  selector: 'app-groc-list-item-all',
  imports: [
    AsyncPipe
  ],
  templateUrl: './groc-list-item-all.component.html',
  styleUrl: './groc-list-item-all.component.css'
})
export class GrocListItemAllComponent implements OnInit {

  public items!: Observable<IInfoItem[]>
private readonly service = inject(InfoService);
  constructor() {
  }

  public ngOnInit(): void {
    this.items = this.service.getAllListItemsForUser()
  }

}
