import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip'
import { IGroceryList } from '../../interfaces/igrocery-list';
import { IGroceryListItem } from '../../interfaces/igrocery-list-item';
import { Subscription, debounceTime } from 'rxjs';
import { GroceryListService } from '../../services/grocery-list.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GrocListFilterPipe } from "./groc-list-filter.pipe";
import { GroceryList } from '../../models/grocery-list';
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-groc-list-detail',
  standalone: true,
  templateUrl: './groc-list-detail.component.html',
  styleUrl: './groc-list-detail.component.css',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    FormsModule,
    RouterModule,
    GrocListFilterPipe
  ]
})
export class GrocListDetailComponent implements OnInit, OnDestroy {
  public itemGroup: FormGroup;
  public groceryList: IGroceryList;
  public listFilter: string = '';
  public suggestions: IGroceryListItem[]
  public subscription: Subscription = new Subscription();
  public itemName: FormControl;
  private readonly ID = 'id';

  constructor(
    private readonly groceryListService: GroceryListService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder) {
    this.itemName = new FormControl('', Validators.compose([Validators.required, Validators.maxLength(35)]))
    this.itemGroup = this.formBuilder.group({
      itemName: this.itemName,
      hasCoupon: [false]
    });
    this.groceryList = new GroceryList('', '');
  }

  public ngOnInit(): void {
    const id = +this.route.snapshot.params[this.ID];
    this.groceryListService.getList(id).subscribe(list => this.groceryList = list);

    this.subscription.add(
      this.itemGroup
        .controls['itemName']
        .valueChanges
        .pipe(debounceTime(200))
        .subscribe(value => this.groceryListService.suggestListItem(value)
          .subscribe(values => this.suggestions = values)));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public get isRequired(): boolean {
    return this.itemName.hasError('required') && this.itemName.touched;
  }

  public get isMaxLength(): boolean {
    return this.itemName.hasError('maxlength') && this.itemName.touched;
  }

  private get isComplete(): boolean {
    return this.groceryList.items.length > 0 && this.groceryList.items.findIndex(i => !i.isCollected) === -1;
  }

  public goBack(): void {
    this.router.navigate(['/']);
  }

  public add(): void {
    this.subscription.add(
      this.groceryListService.addListItem({
        groceryListId: this.groceryList.id,
        name: this.itemName.value,
        isCollected: false,
        hasCoupon: this.itemGroup.controls['hasCoupon'].value ?? false,
      }).subscribe(
        newListItem => this.groceryList.items.push(newListItem))
    );

    this.itemGroup.reset();
    this.itemName.setErrors(null);
  }

  public delete(item: IGroceryListItem): void {
    this.subscription.add(
      this.groceryListService.deleteListItem(item).subscribe(
        () => {
          const index = this.groceryList.items.indexOf(item);
          this.groceryList.items.splice(index, 1);
        },
      ));
  }
  public update(item: IGroceryListItem): void {
    this.subscription.add(
      this.groceryListService.updateListItem(item)
        .subscribe(updatedItem => item = updatedItem));

    this.subscription.add(this.updateList());

  }

  public updateList() {
    this.groceryList.isComplete = this.isComplete;

    this.subscription.add(
      this.groceryListService.updateList(this.groceryList)
        .subscribe(updatedList => this.groceryList.isComplete = updatedList.isComplete));
  }

  public onSelected() {
    this.add();
  }

}
