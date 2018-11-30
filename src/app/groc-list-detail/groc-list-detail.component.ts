import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrocListService } from '../groc-list/groc-list.service';
import { IGroceryList, GroceryList, IGroceryListItem } from '../groc-list/grocerylist';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    templateUrl: './groc-list-detail.component.html',
    styleUrls: ['./groc-list-detail.component.css'],
})
export class GrocListDetailComponent implements OnInit {
    constructor(private _service: GrocListService,
                private _route: ActivatedRoute,
                private _router: Router,
                private _fb: FormBuilder) {

        this.itemGroup = _fb.group({
            itemName: ['', Validators.compose([Validators.required, Validators.maxLength(35)])],
        });
        // have to define a default value for grocList
        // otherwise subscribe does not have enough time to
        // link the returned object to the UI
        this.grocList = new GroceryList(1, '');
    }

    itemGroup: FormGroup;
    grocList: IGroceryList;
    listFilter: string;

    ngOnInit(): void {
        let id = +this._route.snapshot.params['id'];
        this._service.getList(id).subscribe(list => this.grocList = list);
    }

    goBack(): void {
        this._router.navigate(['/']);
    }

    add(): void {
        this._service.addListItem({
            id: this.grocList.items.length,
            groceryListId: this.grocList.id,
            itemName: this.itemGroup.controls.itemName.value,
            isCollected: false,
         })
         .subscribe(newListItem => this.grocList.items.push(newListItem));
        this.itemGroup.reset();
    }

    delete(item: IGroceryListItem): void {
        this._service.deleteListItem(item).subscribe(
            item => {
                let index = this.grocList.items.indexOf(item);
                this.grocList.items.splice(index, 1);
            },
        );
    }

    update(item: IGroceryListItem): void {
        this._service.updateListItem(item).subscribe(updatedItem => item = updatedItem);
        // if there all the times are completed, we want to mark the list as such
        if (this.grocList.items.findIndex(i => !i.isCollected) === -1) {
            this.grocList.isComplete = true;
        }
        else {
            this.grocList.isComplete = false;
        }
        this._service.updateList(this.grocList)
        .subscribe(updatedList => this.grocList.isComplete = updatedList.isComplete);
    }
}