import {Component, inject, OnInit} from '@angular/core';
import {IGroceryList} from "../../interfaces/igrocery-list";
import {GroceryListService} from "../../services/grocery-list.service";
import {ActivatedRoute} from "@angular/router";
import {GroceryList} from "../../models/grocery-list";

@Component({
  standalone: true,
  selector: 'app-groc-list-print',
  imports: [],
  templateUrl: './groc-list-print.component.html',
  styleUrl: './groc-list-print.component.css'
})
export class GrocListPrintComponent implements OnInit {
  public grocList: IGroceryList = new GroceryList('', '');

  private readonly groceryListService = inject(GroceryListService);
  private readonly route = inject(ActivatedRoute);
  constructor() {
  }

  public ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.groceryListService.getList(id)
      .subscribe(list => {
        this.grocList = list
      });
  }
}
