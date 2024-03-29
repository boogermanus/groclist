import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrocListComponent } from './groc-list/groc-list.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuardService as AuthGuard} from './auth/auth-guard.service';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
    { path: '', component: GrocListComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
@NgModule ({
    imports: [
        RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
