import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailResolverService } from './service/product-detail-resolver.service';

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
        component : ProductDetailComponent,
        resolve: {
          product: ProductDetailResolverService
        }
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
