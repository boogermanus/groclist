import {Routes} from '@angular/router';
import {authGuard} from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./groclist/groc-list/groc-list.component').then(m => m.GrocListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'all-lists',
    loadComponent: () => import('./groclist/groc-list-all/groc-list-all.component').then(m => m.GrocListAllComponent),
    canActivate: [authGuard]
  },
  {
    path: 'all-items',
    loadComponent: () => import('./groclist/groc-list-item-all/groc-list-item-all.component').then(m => m.GrocListItemAllComponent),
    canActivate: [authGuard]
  },
  {path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)},
  {path: 'register', loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)},
  {
    path: 'change-password',
    loadComponent: () => import('./auth/change-password/change-password.component').then(m => m.ChangePasswordComponent)
  },
  {
    path: 'list/:id',
    loadComponent: () => import('./groclist/groc-list-detail/groc-list-detail.component').then(m => m.GrocListDetailComponent),
    canActivate: [authGuard]
  },
  {
    path: 'print/:id',
    loadComponent: () => import('./groclist/groc-list-print/groc-list-print.component').then(m => m.GrocListPrintComponent),
    canActivate: [authGuard]
  },
  {path: '**', redirectTo: 'login', pathMatch: 'full'},

];
