import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroceryListService } from '../services/grocery-list.service';
import { IGroceryList, GroceryList } from '../model/grocery-list';
import { IGroceryListItem } from '../model/grocery-list.interface';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
    templateUrl: './groc-list-detail.component.html',
    styleUrls: ['./groc-list-detail.component.css'],
})
export class GrocListDetailComponent implements OnInit, OnDestroy {

    public itemGroup: FormGroup;
    public groceryList: IGroceryList;
    public listFilter = '';
    public suggestions: IGroceryListItem[];
    public subscriptions: Subscription = new Subscription();
    public itemName: FormControl;
    private readonly ID = 'id';

    public get isRequired(): boolean {
        return this.itemName.hasError('required') && this.itemName.touched;
    }

    public get isMaxLength(): boolean {
        return this.itemName.hasError('maxlength') && this.itemName.touched;
    }

    private get isComplete(): boolean {
        return this.groceryList.items.length > 0 && this.groceryList.items.findIndex(i => !i.isCollected) === -1;
    }


    constructor(private _service: GroceryListService,
                private _route: ActivatedRoute,
                private _router: Router,
                private _fb: FormBuilder) {
        this.itemName = new FormControl('', Validators.compose([Validators.required, Validators.maxLength(35)]));
        this.itemGroup = this._fb.group({
            itemName: this.itemName,
            hasCoupon: [false],
        });
        // have to define a default value for groceryList
        // otherwise subscribe does not have enough time to
        // link the returned object to the UI
        this.groceryList = new GroceryList('', '');
    }

    public ngOnInit(): void {
        const id = +this._route.snapshot.params[this.ID];
        this._service.getList(id).subscribe(list => this.groceryList = list);

        this.subscriptions.add(
            this.itemGroup
            .controls
            ['itemName']
            .valueChanges
            .pipe(debounceTime(200))
            .subscribe(value => this._service.suggestListItem(value)
            .subscribe(values => this.suggestions = values)));
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    public goBack(): void {
        this._router.navigate(['/']);
    }

    public add(): void {
        this.subscriptions.add(
            this._service.addListItem({
            groceryListId: this.groceryList.id,
            name: this.itemGroup.controls['itemName'].value,
            isCollected: false,
            hasCoupon: this.itemGroup.controls['hasCoupon'].value ?? false,
         }).subscribe(
             newListItem => this.groceryList.items.push(newListItem))
        );

        this.itemGroup.reset();
        this.itemName.setErrors(null);
    }

    public delete(item: IGroceryListItem): void {
        this.subscriptions.add(
            this._service.deleteListItem(item).subscribe(
            () => {
                const index = this.groceryList.items.indexOf(item);
                this.groceryList.items.splice(index, 1);
            },
        ));
    }

    public update(item: IGroceryListItem): void {
        this.subscriptions.add(
            this._service.updateListItem(item)
            .subscribe(updatedItem => item = updatedItem));

        this.subscriptions.add(this.updateList());

    }

    public updateList() {
        this.groceryList.isComplete = this.isComplete;

        this.subscriptions.add(
            this._service.updateList(this.groceryList)
            .subscribe(updatedList => this.groceryList.isComplete = updatedList.isComplete));
    }

    public onSelected() {
        this.add();
    }
}
