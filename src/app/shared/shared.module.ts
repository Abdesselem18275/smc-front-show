import { NgModule } from '@angular/core';
import { ProductMenuComponent } from '../product/product-menu/product-menu.component';
import { TreeMenuComponent } from '../product/product-menu/tree-menu/tree-menu.component';
import { SideNavMenuComponent } from '../product/product-menu/side-nav-menu/side-nav-menu.component';
import { SearchBoxComponent } from '../product/search-box/search-box.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductMenuComponent, TreeMenuComponent,
                 SideNavMenuComponent, SearchBoxComponent],
  imports:  [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProductMenuComponent,
    TreeMenuComponent,
    SideNavMenuComponent,
    SearchBoxComponent,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule
  ]
})
export class SharedModule { }
