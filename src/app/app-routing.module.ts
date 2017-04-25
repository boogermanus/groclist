import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { GrocListComponent } from './groclist/groc-list.component';

const routes: Routes = [
    { path: '', component: GrocListComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
]
@NgModule ({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}