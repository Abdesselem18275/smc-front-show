import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { MaterialModule } from '../material';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ProductRoutingModule
  ],
  declarations: [ProductComponent , ProductHomeComponent]
})
export class ProductModule { }
