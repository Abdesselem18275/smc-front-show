import { NgModule } from '@angular/core';

import { MiscellaneousRoutingModule } from './miscellaneous-routing.module';
import { MiscellaneousComponent } from './miscellaneous/miscellaneous.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
  declarations: [MiscellaneousComponent, ProductCategoryComponent, ProductHomeComponent, ContactUsComponent],
  imports: [
    CommonModule,
    SharedModule,
    GoogleMapsModule,
    MiscellaneousRoutingModule
  ]
})
export class MiscellaneousModule { }
