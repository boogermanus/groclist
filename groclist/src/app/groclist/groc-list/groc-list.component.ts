import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { IGroceryList } from '../../interfaces/igrocery-list';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { GroceryListService } from '../../services/grocery-list.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-groc-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './groc-list.component.html',
  styleUrl: './groc-list.component.css'
})
export class GrocListComponent implements OnDestroy {
  public formName: FormGroup;
  public groceryLists: Observable<IGroceryList[]>
  public subscription: Subscription = null;
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
  ngOnDestroy(): void {
    if(this.subscription !== null) {
      this.subscription.unsubscribe();
    }
  }
}
