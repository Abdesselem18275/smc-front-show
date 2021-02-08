import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailResolverService } from './service/product-detail-resolver.service';
import { AuthGuard } from '../account/auth.guard';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';
import { ProductHomeComponent } from '../miscellaneous/components/product-home/product-home.component';

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
