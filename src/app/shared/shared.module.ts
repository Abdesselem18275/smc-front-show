import { NgModule } from '@angular/core';
import { SearchBoxComponent } from '../product/search-box/search-box.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountLoginComponent } from '../account/account-login/account-login.component';
import { CategoryBreadcrumbComponent } from './category-breadcrumb/category-breadcrumb.component';
import { LoadingComponent } from './loading/loading.component';

import { ScrollPaginatorDirective } from './scroll-paginator.directive';
import { TextHightlightDirective } from './text-hightlight.directive';
import { RouterOutletToggleDirective } from './router-outlet-toggle.directive';
import { AccountCardComponent } from '../account/account-card/account-card.component';
import { GoogleSignInComponent } from '../account/google-sign-in/google-sign-in.component';
import { ProductFilterComponent } from '../product/product-filter/product-filter.component';
import { CreateProfileComponent } from '../account/create-profile/create-profile.component';
import { LanguageBoxComponent } from './language-box/language-box.component';
import { CategoryMenuComponent } from './category-menu/category-menu.component';
import { ProductMenuComponent } from './product-menu/product-menu.component';
import { SideNavMenuComponent } from './side-nav-menu/side-nav-menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { CategoriesTreeComponent } from './categories-tree/categories-tree.component';
import { AuthentificationCardComponent } from '../account/authentification-card/authentification-card.component';
import { CustomPluralPipe } from './custom-plural.pipe';
import { ControlValidatorMessageDirective } from '../account/control-validator-message.directive';
import { MergeSizeQsPipe } from './merge-size-qs.pipe';

@NgModule({
  declarations: [ProductMenuComponent,
                 SideNavMenuComponent, SearchBoxComponent,
                 AccountLoginComponent,
                 AuthentificationCardComponent,
                 CreateProfileComponent,
                 GoogleSignInComponent,
                 CategoryBreadcrumbComponent,
                 ProductFilterComponent,
                 AccountCardComponent,
                 LoadingComponent, ScrollPaginatorDirective, TextHightlightDirective,

                 RouterOutletToggleDirective, LanguageBoxComponent, CategoryMenuComponent,ControlValidatorMessageDirective, MenuItemComponent, CategoriesTreeComponent, CustomPluralPipe, MergeSizeQsPipe],
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
    AccountLoginComponent,
    CategoryBreadcrumbComponent,
    ScrollPaginatorDirective,
    LoadingComponent,
    GoogleSignInComponent,
    CreateProfileComponent,
    AccountCardComponent,
    ProductFilterComponent,
    AuthentificationCardComponent,
    ControlValidatorMessageDirective,
    CustomPluralPipe,
    MergeSizeQsPipe,
    CommonModule,

  ]
})
export class SharedModule { }
