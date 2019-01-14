import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductListComponent } from './product-list/product-list.component';

const productRoutes: Routes = [
  { path : 'product',
    component : ProductComponent,
    children : [
      {
        path : 'home',
        component : ProductHomeComponent
      },
      {
        path : 'list',
        component : ProductListComponent
      },
      {
        path : '',
        component : ProductHomeComponent

      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
