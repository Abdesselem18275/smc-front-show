import { NgModule } from '@angular/core';


import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFilterComponent } from './product-list/product-filter/product-filter.component';
import { FilterBuilderService } from './service/filter-builder.service';
import { DataInjectablesService } from './service/data-injectables.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductBreadcrumbComponent } from './product-breadcrumb/product-breadcrumb.component';
import { ProductCategoryComponent } from './product-home/product-category/product-category.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    SharedModule,
    ProductRoutingModule,
  ],
  declarations: [ProductComponent , ProductHomeComponent, ProductListComponent, ProductFilterComponent,
                  ProductDetailComponent, ProductBreadcrumbComponent, ProductCategoryComponent],
  providers:  [FilterBuilderService, DataInjectablesService ]
})
export class ProductModule { }
