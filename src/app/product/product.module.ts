import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { MaterialModule } from '../material';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterBuilderService } from './service/filter-builder.service';
import { DataInjectablesService } from './service/data-injectables.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductBreadcrumbComponent } from './product-breadcrumb/product-breadcrumb.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductMenuComponent } from './product-menu/product-menu.component';



@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    ProductRoutingModule,
  ],
  declarations: [ProductComponent , ProductHomeComponent, ProductListComponent, ProductFilterComponent,
                  ProductDetailComponent, ProductBreadcrumbComponent, SearchBoxComponent, ProductCategoryComponent, ProductMenuComponent],
  providers:  [FilterBuilderService, DataInjectablesService ],
  exports : [SearchBoxComponent]
})
export class ProductModule { }
