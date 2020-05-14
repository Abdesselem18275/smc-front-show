import { NgModule } from '@angular/core';
import { SearchBoxComponent } from '../product/search-box/search-box.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountLoginComponent } from '../account/account-login/account-login.component';
import { ProductBoxComponent } from './product-box/product-box.component';
import { CategoryBreadcrumbComponent } from './category-breadcrumb/category-breadcrumb.component';
import { LoadingComponent } from './loading/loading.component';

import { ScrollPaginatorDirective } from './scroll-paginator.directive';
import { TextHightlightDirective } from './text-hightlight.directive';
import { FavoriteHandlerDirective } from './favorite-handler.directive';
import { RouterOutletToggleDirective } from './router-outlet-toggle.directive';
import { AccountCardComponent } from '../account/account-card/account-card.component';
import { GoogleSignInComponent } from '../account/google-sign-in/google-sign-in.component';
import { ProductFilterComponent } from '../product/product-filter/product-filter.component';
import { CreateProfileComponent } from '../account/create-profile/create-profile.component';
import { LanguageBoxComponent } from './language-box/language-box.component';
import { CategoryMenuComponent } from './category-menu/category-menu.component';
import { ProductMenuComponent } from './product-menu/product-menu.component';
import { TreeMenuComponent } from './tree-menu/tree-menu.component';
import { SideNavMenuComponent } from './side-nav-menu/side-nav-menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';

@NgModule({
  declarations: [ProductMenuComponent, TreeMenuComponent,
                 SideNavMenuComponent, SearchBoxComponent,
                 AccountLoginComponent,
                 CreateProfileComponent,
                 GoogleSignInComponent,
                 ProductBoxComponent, CategoryBreadcrumbComponent,
                 ProductFilterComponent,
                 AccountCardComponent,
                 LoadingComponent, ScrollPaginatorDirective, TextHightlightDirective,
                 FavoriteHandlerDirective, RouterOutletToggleDirective, LanguageBoxComponent, CategoryMenuComponent, MenuItemComponent],
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
    AccountLoginComponent,
    ProductBoxComponent,
    CategoryBreadcrumbComponent,
    ScrollPaginatorDirective,
    FavoriteHandlerDirective,
    LoadingComponent,
    GoogleSignInComponent,
    CreateProfileComponent,
    AccountCardComponent,
    ProductFilterComponent,
    CommonModule,

  ]
})
export class SharedModule { }
