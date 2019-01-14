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
import { ProductDataService } from './service/product-data.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    ProductRoutingModule,
  ],
  declarations: [ProductComponent , ProductHomeComponent, ProductListComponent, ProductFilterComponent],
  providers:  [FilterBuilderService, ProductDataService]
})
export class ProductModule { }
