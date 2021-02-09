import { NgModule } from '@angular/core';

import { ScrollPaginatorDirective } from './directives/scroll-paginator.directive';
import { ControlValidatorMessageDirective } from './directives/control-validator-message.directive';
import { ImageZoomDirective } from './directives/image-zoom.directive';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material';
import { CategoriesTreeComponent } from './components/categories-tree/categories-tree.component';
import { CategoryMenuComponent } from './components/category-menu/category-menu.component';
import { ControlErrorMessageComponent } from './components/control-error-message/control-error-message.component';
import { InitialsIconComponent } from './components/initials-icon/initials-icon.component';
import { LanguageBoxComponent } from './components/language-box/language-box.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { ProductMenuComponent } from './components/product-menu/product-menu.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { SideNavMenuComponent } from './components/side-nav-menu/side-nav-menu.component';
import { MergeSizeQsPipe } from './merge-size-qs.pipe';
import { ModalCloseDirective } from './directives/modal-close.directive';
import { CountryFlagPipe } from './pipes/country-flag.pipe';
import { ShippingCountrySelectorDialogComponent } from
  './components/shipping-country-selector-dialog/shipping-country-selector-dialog.component';
import { CurrencySelectorDialogComponent } from './components/currency-selector-dialog/currency-selector-dialog.component';
@NgModule({
  declarations: [ProductMenuComponent,
    SideNavMenuComponent,SearchBoxComponent,
    LoadingComponent,ScrollPaginatorDirective,InitialsIconComponent,
    ControlValidatorMessageDirective,LanguageBoxComponent,CategoryMenuComponent,
    MenuItemComponent, CategoriesTreeComponent, MergeSizeQsPipe, ModalCloseDirective, ControlErrorMessageComponent,
    ImageZoomDirective, CountryFlagPipe, ShippingCountrySelectorDialogComponent, CurrencySelectorDialogComponent],
  imports:  [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProductMenuComponent,
    SideNavMenuComponent,
    SearchBoxComponent,
    ReactiveFormsModule,
    MaterialModule,
    ControlValidatorMessageDirective,
    InitialsIconComponent,
    ScrollPaginatorDirective,
    LoadingComponent,
    MergeSizeQsPipe,
    ControlErrorMessageComponent,
    ImageZoomDirective,
    ModalCloseDirective,
    CountryFlagPipe,
  ]
})
export class SharedModule { }
