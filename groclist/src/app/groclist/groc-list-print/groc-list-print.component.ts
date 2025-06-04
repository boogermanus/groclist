import {Component, Input, OnInit} from '@angular/core';
import {IGroceryList} from "../../interfaces/igrocery-list";
import {GroceryListService} from "../../services/grocery-list.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-groc-list-print',
  standalone: true,
  imports: [],
  templateUrl: './groc-list-print.component.html',
  styleUrl: './groc-list-print.component.css'
})
export class GrocListPrintComponent implements OnInit {
  public grocList: IGroceryList;
  constructor(private groceryListService: GroceryListService, private route: ActivatedRoute) {}

  public ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.groceryListService.getList(id)
      .subscribe(list => {this.grocList = list});
  }
}
