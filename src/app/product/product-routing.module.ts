import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductCategoryComponent } from './product-category/product-category.component';

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
        path: ':id',
        component : ProductDetailComponent
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
