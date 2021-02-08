import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MiscellaneousComponent } from './components/miscellaneous/miscellaneous.component';
import { ProductHomeComponent } from './components/product-home/product-home.component';

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
