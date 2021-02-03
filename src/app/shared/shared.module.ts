import { NgModule } from '@angular/core';
import { SearchBoxComponent } from './search-box/search-box.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';

import { ScrollPaginatorDirective } from './scroll-paginator.directive';
import { LanguageBoxComponent } from './language-box/language-box.component';
import { CategoryMenuComponent } from './category-menu/category-menu.component';
import { ProductMenuComponent } from './product-menu/product-menu.component';
import { SideNavMenuComponent } from './side-nav-menu/side-nav-menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { CategoriesTreeComponent } from './categories-tree/categories-tree.component';
import { MergeSizeQsPipe } from './merge-size-qs.pipe';
import { ModalCloseDirective } from './modal-close.directive';
import { InitialsIconComponent } from './initials-icon/initials-icon.component';
import { AccountCardComponent } from './account-card/account-card.component';
import { ControlErrorMessageComponent } from './control-error-message/control-error-message.component';
import { ControlValidatorMessageDirective } from './control-validator-message.directive';
import { ImageZoomDirective } from './directives/image-zoom.directive';
@NgModule({
  declarations: [ProductMenuComponent,
    SideNavMenuComponent,SearchBoxComponent,
    LoadingComponent,ScrollPaginatorDirective,InitialsIconComponent,
    AccountCardComponent,ControlValidatorMessageDirective,LanguageBoxComponent,CategoryMenuComponent,
    MenuItemComponent, CategoriesTreeComponent, MergeSizeQsPipe, ModalCloseDirective, ControlErrorMessageComponent, ImageZoomDirective],
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
    AccountCardComponent,
    InitialsIconComponent,
    ScrollPaginatorDirective,
    LoadingComponent,
    MergeSizeQsPipe,
    ControlErrorMessageComponent,
    ImageZoomDirective,
    ModalCloseDirective,
  ]
})
export class SharedModule { }
