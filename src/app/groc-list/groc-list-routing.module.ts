import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrocListDetailComponent } from '../groc-list-detail/groc-list-detail.component';
import { AuthGuardService as AuthGuard} from '../login/auth-guard.service';

const routes: Routes = [
    {
        path: 'groclist/:id',
        component: GrocListDetailComponent,
        canActivate: [AuthGuard],
    },
];
@NgModule ({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule],
})
export class GrocListRoutingModule {}