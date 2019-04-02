import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrocListService } from '../services/groc-list.service';
import { IGroceryList, GroceryList, IGroceryListItem, IGroceryListItemSuggestion } from '../model/grocerylist';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatOption } from '@angular/material';
const ID: string = 'id';

@Component({
    templateUrl: './groc-list-detail.component.html',
    styleUrls: ['./groc-list-detail.component.css'],
})
export class GrocListDetailComponent implements OnInit {
    constructor(private _service: GrocListService,
                private _route: ActivatedRoute,
                private _router: Router,
                private _fb: FormBuilder) {

        this.itemGroup = this._fb.group({
            itemName: ['', Validators.compose([Validators.required, Validators.maxLength(35)])],
            hasCoupon: [''],
        });
        // have to define a default value for grocList
        // otherwise subscribe does not have enough time to
        // link the returned object to the UI
        this.grocList = new GroceryList(1, '');
    }

    public itemGroup: FormGroup;
    public grocList: IGroceryList;
    public listFilter: string = '';
    public suggestions: IGroceryListItemSuggestion[];

    public ngOnInit(): void {
        let id = +this._route.snapshot.params[ID];
        this._service.getList(id).subscribe(list => this.grocList = list);

        this.itemGroup
            .controls
            .itemName
            .valueChanges
            .pipe(debounceTime(200))
            .subscribe(value => this._service.suggestListItem(value)
            .subscribe(values => this.suggestions = values));
    }

    public goBack(): void {
        this._router.navigate(['/']);
    }

    public add(): void {
        this._service.addListItem({
            id: this.grocList.items.length,
            groceryListId: this.grocList.id,
            name: this.itemGroup.controls.itemName.value,
            isCollected: false,
            hasCoupon: this.itemGroup.controls.hasCoupon.value,
         })
         .subscribe(newListItem => this.grocList.items.push(newListItem));
        this.itemGroup.reset();
    }

    public delete(item: IGroceryListItem): void {
        this._service.deleteListItem(item).subscribe(
            next => {
                let index = this.grocList.items.indexOf(item);
                this.grocList.items.splice(index, 1);
            },
        );
    }

    public update(item: IGroceryListItem): void {
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

    public onSelected() {
        this.add();
    }
}