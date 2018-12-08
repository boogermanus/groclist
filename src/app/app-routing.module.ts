import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrocListComponent } from './groc-list/groc-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService as AuthGuard} from './login/auth-guard.service';

const routes: Routes = [
    { path: '', component: GrocListComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent},
    { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
@NgModule ({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}