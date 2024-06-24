import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrocListDetailComponent } from '../groc-list-detail/groc-list-detail.component';
import { AuthGuardService as AuthGuard} from '../auth/auth-guard.service';

const routes: Routes = [
    {
        path: 'list/:id',
        component: GrocListDetailComponent,
    },
];
@NgModule ({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule],
})
export class GrocListRoutingModule {}
