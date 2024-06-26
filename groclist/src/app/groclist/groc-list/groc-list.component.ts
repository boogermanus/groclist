import { AfterContentInit, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
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
@Component({
  selector: 'app-groc-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    NavMenuComponent
  ],
  templateUrl: './groc-list.component.html',
  styleUrl: './groc-list.component.css'
})
export class GrocListComponent implements OnDestroy, AfterContentInit {
  public formName: FormGroup;
  public groceryLists: Observable<IGroceryList[]>
  public subscription: Subscription = new Subscription();
  public listName: FormControl

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

  public ngOnDestroy(): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
    }
  }

  public ngAfterContentInit(): void {
    this.groceryLists = this.groceryListService.getLists();
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  public changePassword(): void {
    this.router.navigate(['/changepassword'])
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
}
