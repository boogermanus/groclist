import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GrocListService } from './groc-list.service';
import { IGroceryList } from './grocerylist';

@Component({
    templateUrl: './groc-list-detail.component.html',
    styleUrls: ['./groc-list-detail.component.css']
})
export class GrocListDetailComponent implements OnInit {
    constructor(private _service:GrocListService,
                private _route:ActivatedRoute) {
    }

    grocList: IGroceryList;

    ngOnInit(): void {
        let id = +this._route.snapshot.params['id']
        this.grocList = this._service.getList(id);
    }
}