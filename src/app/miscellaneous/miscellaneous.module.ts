import { NgModule } from '@angular/core';

import { MiscellaneousRoutingModule } from './miscellaneous-routing.module';
import { MiscellaneousComponent } from './miscellaneous/miscellaneous.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [MiscellaneousComponent, ProductCategoryComponent, ProductHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    MiscellaneousRoutingModule
  ]
})
export class MiscellaneousModule { }
