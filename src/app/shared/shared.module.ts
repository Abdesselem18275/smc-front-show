import { NgModule } from '@angular/core';
import { SearchBoxComponent } from '../product/search-box/search-box.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryBreadcrumbComponent } from './category-breadcrumb/category-breadcrumb.component';
import { LoadingComponent } from './loading/loading.component';

import { ScrollPaginatorDirective } from './scroll-paginator.directive';
import { TextHightlightDirective } from './text-hightlight.directive';
import { RouterOutletToggleDirective } from './router-outlet-toggle.directive';
import { ProductFilterComponent } from '../product/product-filter/product-filter.component';
import { LanguageBoxComponent } from './language-box/language-box.component';
import { CategoryMenuComponent } from './category-menu/category-menu.component';
import { ProductMenuComponent } from './product-menu/product-menu.component';
import { SideNavMenuComponent } from './side-nav-menu/side-nav-menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { CategoriesTreeComponent } from './categories-tree/categories-tree.component';
import { MergeSizeQsPipe } from './merge-size-qs.pipe';
import { AccountCardComponent } from './account-card/account-card.component';
import { UserRequestComponent } from './user-request/user-request.component';
import { GoogleSignInComponent } from '../account/google-sign-in/google-sign-in.component';
import { AuthentificationCardComponent } from './authentification-card/authentification-card.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { ModalCloseDirective } from './modal-close.directive';

@NgModule({
  declarations: [ProductMenuComponent,
    SideNavMenuComponent,SearchBoxComponent,CategoryBreadcrumbComponent,AuthentificationCardComponent,
    GoogleSignInComponent,AccountLoginComponent,CreateProfileComponent,ProductFilterComponent,
    AccountCardComponent,UserRequestComponent,LoadingComponent,ScrollPaginatorDirective,
    TextHightlightDirective,RouterOutletToggleDirective, LanguageBoxComponent,CategoryMenuComponent,
    MenuItemComponent, CategoriesTreeComponent, MergeSizeQsPipe, ModalCloseDirective],
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
    UserRequestComponent,
    SearchBoxComponent,
    AuthentificationCardComponent,
    ReactiveFormsModule,
    MaterialModule,
    CategoryBreadcrumbComponent,
    ScrollPaginatorDirective,
    LoadingComponent,
    ProductFilterComponent,
    MergeSizeQsPipe,
    ModalCloseDirective
  ]
})
export class SharedModule { }
