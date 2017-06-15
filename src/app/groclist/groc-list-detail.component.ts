import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrocListService } from './groc-list.service';
import { IGroceryList, GroceryList, IGroceryListItem } from './grocerylist';
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
        //have to define a default value for grocList
        this.grocList = new GroceryList(1,'test');
    }

    itemGroup: FormGroup;
    grocList: IGroceryList;

    ngOnInit(): void {
        let id = +this._route.snapshot.params['id']
        this._service.getList(id).subscribe(list => this.grocList = list);
    }

    goBack(): void {
        this._router.navigate(['/']);
    }

    add(): void {
        this._service.addListItem({
            id: this.grocList.groceryListItems.length,
            groceryListId: this.grocList.id,
            itemName: this.itemGroup.controls.itemName.value,
            isCollected: false
         })
         .subscribe(newListItem => this.grocList.groceryListItems.push(newListItem));
         this.itemGroup.reset();
    }

    delete(item: IGroceryListItem) : void {
        this._service.deleteListItem(item).subscribe(
            item => {
                let index = this.grocList.groceryListItems.indexOf(item)
                this.grocList.groceryListItems.splice(index, 1);
            }
        )
    }

    update(item: IGroceryListItem) : void {
        this._service.updateListItem(item).subscribe(updatedItem => item = updatedItem);
    }
}