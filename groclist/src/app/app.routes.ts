import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { GrocListComponent } from './groclist/groc-list/groc-list.component';
import { authGuard } from './auth/auth.guard';
import { GrocListDetailComponent } from './groclist/groc-list-detail/groc-list-detail.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { GrocListAllComponent } from './groclist/groc-list-all/groc-list-all.component';

export const routes: Routes = [
    { path: '', component: GrocListComponent, canActivate: [authGuard] },
    { path: 'all', component: GrocListAllComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'changepassword', component: ChangePasswordComponent },
    { path: 'list/:id', component: GrocListDetailComponent },
    { path: '**', redirectTo: 'login', pathMatch: 'full' },

];
