import { Component, OnInit } from '@angular/core';
import {GroceryListService} from "../../services/grocery-list.service";
import {Observable} from "rxjs";
import {IInfoItem} from "../../interfaces/iinfo-item";
import {AsyncPipe} from "@angular/common";
import { InfoService } from '../../services/info.service';

@Component({
  selector: 'app-groc-list-item-all',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './groc-list-item-all.component.html',
  styleUrl: './groc-list-item-all.component.css'
})
export class GrocListItemAllComponent implements OnInit {

    public items!: Observable<IInfoItem[]>
    constructor(private service: InfoService) {
    }
    public ngOnInit(): void {
        this.items = this.service.getAllListItemsForUser()
    }

}
