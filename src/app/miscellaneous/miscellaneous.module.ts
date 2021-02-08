import { NgModule } from '@angular/core';

import { MiscellaneousRoutingModule } from './miscellaneous-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { MiscellaneousComponent } from './components/miscellaneous/miscellaneous.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { ProductHomeComponent } from './components/product-home/product-home.component';


@NgModule({
  declarations: [MiscellaneousComponent, ProductCategoryComponent, ProductHomeComponent, ContactUsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MiscellaneousRoutingModule
  ]
})
export class MiscellaneousModule { }
