import {CommonModule} from '@angular/common';
import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip'
import {IGroceryList} from '../../interfaces/igrocery-list';
import {IGroceryListItem} from '../../interfaces/igrocery-list-item';
import {Subscription, debounceTime} from 'rxjs';
import {GroceryListService} from '../../services/grocery-list.service';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {GrocListFilterPipe} from "./groc-list-filter.pipe";
import {GroceryList} from '../../models/grocery-list';
import {MatButtonModule} from '@angular/material/button'

@Component({
  standalone: true,
  selector: 'app-groc-list-detail',
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
  public suggestions: string[] = [];
  public subscription: Subscription = new Subscription();
  public itemName: FormControl<string> = new FormControl('', [Validators.required, Validators.maxLength(35)]);
  private readonly ID = 'id';

  private readonly groceryListService = inject(GroceryListService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  constructor() {
    this.groceryList = new GroceryList('', '');
  }

  public ngOnInit(): void {
    this.itemGroup = this.formBuilder.group({
      itemName: this.itemName,
      hasCoupon: [false]
    });

    const id = +this.route.snapshot.params[this.ID];
    this.groceryListService.getList(id).subscribe(list => this.groceryList = list);

    this.subscription.add(
      this.itemGroup
        .controls['itemName']
        .valueChanges
        .pipe(debounceTime(200))
        .subscribe(value => {
            if (value !== '')
              this.groceryListService.suggestListItem(value)
                .subscribe(values => this.suggestions = values)
          }
        ));
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
          this.updateList();
        },
      ));
  }

  public update(item: IGroceryListItem): void {
    this.subscription.add(
      this.groceryListService.updateListItem(item)
        .subscribe(updatedItem => item = updatedItem));
    this.updateList();

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

  public print(): void {
    this.router.navigate(['/print', this.groceryList.id]);
  }
}
