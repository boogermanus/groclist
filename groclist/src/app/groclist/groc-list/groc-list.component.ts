import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, Observable, Subscription } from 'rxjs';
import { IGroceryList } from '../../interfaces/igrocery-list';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { GroceryListService } from '../../services/grocery-list.service';
import { AuthService } from '../../services/auth.service';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { GroceryList } from '../../models/grocery-list';
import { NavMenuComponent } from '../../nav-menu/nav-menu.component';
import { InfoComponent } from "../info/info.component";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
@Component({
    selector: 'app-groc-list',
    imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        NavMenuComponent,
        InfoComponent,
        MatAutocompleteModule
    ],
    templateUrl: './groc-list.component.html',
    styleUrl: './groc-list.component.css'
})
export class GrocListComponent implements OnDestroy, AfterContentInit, OnInit {
  public formName: FormGroup;
  public groceryLists: Observable<IGroceryList[]>
  public subscription: Subscription = new Subscription();
  public listName: FormControl
  public suggestions: string[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly groceryListService: GroceryListService,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.listName = new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50)]));
    this.formName = this.formBuilder.group({
      listName: this.listName
    });
  }

  public ngOnInit(): void {
    this.subscription.add(
      this.formName
        .controls['listName']
        .valueChanges
        .pipe(debounceTime(200))
        .subscribe(value => {
          if (value !== '')
            this.groceryListService.suggestList(value)
              .subscribe(values => this.suggestions = values)
        }
        ));
  }
  public ngOnDestroy(): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
    }
  }

  public ngAfterContentInit(): void {
    this.groceryLists = this.groceryListService.getLists();
  }

  public add(): void {
    this.subscription.add(this.groceryListService.addList(new GroceryList(this.listName.value, this.authService.userId()))
      .subscribe({
        next: () => {
          this.groceryLists = this.groceryListService.getLists()
        }
      }));
  }

  public delete(list: IGroceryList): void {
    this.subscription.add(this.groceryListService.deleteList(list)
      .subscribe({
        next: () => {
          this.groceryLists = this.groceryListService.getLists();
        }
      }))
  }

  public view(list: IGroceryList): void {
    this.router.navigate(['/list', list.id]);
  }

  public onSelected(): void {
    this.add();
  }
}
