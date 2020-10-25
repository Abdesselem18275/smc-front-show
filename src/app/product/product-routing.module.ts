import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailResolverService } from './service/product-detail-resolver.service';
import { AuthGuard } from '../account/auth.guard';

const productRoutes: Routes = [
  { path : '',
    component : ProductComponent,
    children : [

      {
        path : 'favorites',
        component : ProductListComponent,
        canActivate: [AuthGuard],
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
        redirectTo : 'miscellaneous'

      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
