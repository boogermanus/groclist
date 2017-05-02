import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrocListService } from './groc-list.service';
import { IGroceryList } from './grocerylist';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
    templateUrl: './groc-list-detail.component.html',
    styleUrls: ['./groc-list-detail.component.css']
})
export class GrocListDetailComponent implements OnInit {
    constructor(private _service:GrocListService,
                private _route:ActivatedRoute,
                private _router:Router,
                private _fb:FormBuilder) {

        this.itemGroup = _fb.group({
            'itemName': ['',Validators.compose([Validators.required, Validators.maxLength(35)])]
        })
    }

    itemGroup: FormGroup;
    grocList: IGroceryList;

    ngOnInit(): void {
        let id = +this._route.snapshot.params['id']
        this.grocList = this._service.getList(id);
    }

    goBack(): void {
        this._router.navigate(['/']);
    }

    add(): void {
        this.grocList.items.push({
            id: this.grocList.items.length,
            groceryListId: this.grocList.id,
            itemName: this.itemGroup.controls.itemName.value,
            isCollected: false
         });
    }
}