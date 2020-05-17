import { NgModule } from '@angular/core';


import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FilterBuilderService } from './service/filter-builder.service';
import { DataInjectablesService } from './service/data-injectables.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SharedModule } from '../shared/shared.module';
import { ProductCategoryComponent } from './product-category/product-category.component';



@NgModule({
  imports: [
    SharedModule,
    ProductRoutingModule,
  ],
  declarations: [ProductComponent , ProductHomeComponent, ProductListComponent,
                  ProductDetailComponent, ProductCategoryComponent],
  providers:  [FilterBuilderService, DataInjectablesService ]
})
export class ProductModule { }
