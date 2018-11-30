import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrocListDetailComponent } from '../groc-list-detail/groc-list-detail.component';

const routes: Routes = [
    { path: 'groclist/:id', component: GrocListDetailComponent },
];
@NgModule ({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule],
})
export class GrocListRoutingModule {}