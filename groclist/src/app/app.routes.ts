import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { GroclistComponent } from './groclist/groclist/groclist.component';
import { GroclistdetailComponent } from './groclist/groclistdetail/groclistdetail.component';

export const routes: Routes = [
    // { path: '', component: GroclistComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'list:id', component: GroclistdetailComponent },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
