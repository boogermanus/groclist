import {Routes} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {GrocListComponent} from './groclist/groc-list/groc-list.component';
import {authGuard} from './auth/auth.guard';
import {GrocListDetailComponent} from './groclist/groc-list-detail/groc-list-detail.component';
import {ChangePasswordComponent} from './auth/change-password/change-password.component';
import {GrocListAllComponent} from './groclist/groc-list-all/groc-list-all.component';
import {GrocListPrintComponent} from "./groclist/groc-list-print/groc-list-print.component";
import {GrocListItemAllComponent} from "./groclist/groc-list-item-all/groc-list-item-all.component";

export const routes: Routes = [
  {path: '', component: GrocListComponent, canActivate: [authGuard]},
  {path: 'all-lists', component: GrocListAllComponent, canActivate: [authGuard]},
  {path: 'all-items', component: GrocListItemAllComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: 'list/:id', component: GrocListDetailComponent, canActivate: [authGuard]},
  {path: 'print/:id', component: GrocListPrintComponent, canActivate: [authGuard]},
  {path: '**', redirectTo: 'login', pathMatch: 'full'},

];
