import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';

import { ScrollPaginatorDirective } from './scroll-paginator.directive';
import { TextHightlightDirective } from './text-hightlight.directive';
import { LanguageBoxComponent } from './language-box/language-box.component';
import { CategoryMenuComponent } from './category-menu/category-menu.component';
import { ProductMenuComponent } from './product-menu/product-menu.component';
import { SideNavMenuComponent } from './side-nav-menu/side-nav-menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { CategoriesTreeComponent } from './categories-tree/categories-tree.component';
import { MergeSizeQsPipe } from './merge-size-qs.pipe';
import { AccountCardComponent } from './account-card/account-card.component';
import { ModalCloseDirective } from './modal-close.directive';
import { InitialsIconComponent } from './initials-icon/initials-icon.component';
import {SearchBoxComponent } from './search-box/search-box.component';
@NgModule({
  declarations: [ProductMenuComponent,
    SideNavMenuComponent,SearchBoxComponent,
    AccountCardComponent,LoadingComponent,ScrollPaginatorDirective,
    TextHightlightDirective, LanguageBoxComponent,CategoryMenuComponent,
    MenuItemComponent, CategoriesTreeComponent, MergeSizeQsPipe, ModalCloseDirective, InitialsIconComponent],
  imports:  [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProductMenuComponent,
    AccountCardComponent,
    SideNavMenuComponent,
    ReactiveFormsModule,
    MaterialModule,
    ScrollPaginatorDirective,
    LoadingComponent,
    MergeSizeQsPipe,
    ModalCloseDirective,
  ]
})
export class SharedModule { }
