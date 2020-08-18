import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiscellaneousComponent } from './miscellaneous/miscellaneous.component';
import { ProductHomeComponent } from './product-home/product-home.component';

const routes: Routes = [
  { path: '',
    component: MiscellaneousComponent,
    children: [
      {
        path:'home',
        component: ProductHomeComponent,
      }
    ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiscellaneousRoutingModule { }
