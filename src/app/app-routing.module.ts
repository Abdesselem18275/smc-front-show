import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {RouterModule , Routes} from '@angular/router';


import { PageNotFoundComponent} from './page-not-found/page-not-found/page-not-found.component';
import { ProductComponent } from './product/product/product.component';
import { AccountComponent } from './account/account/account.component';
import { SearchBoxComponent } from './product/search-box/search-box.component';
import { AccountLoginComponent } from './account/account-login/account-login.component';
import { SideNavMenuComponent } from './product/product-menu/side-nav-menu/side-nav-menu.component';


const appRoutes: Routes = [

  {path : '' , component : ProductComponent},
  {path : 'account' , component : AccountComponent},
  {
    path: 'search',
    component: SearchBoxComponent,
    outlet: 'popup'
  },
  {
    path: 'login',
    component: AccountLoginComponent,
    outlet: 'popup'
  },
  {
    path: 'menu',
    component: SideNavMenuComponent,
    outlet: 'side'
  },
  {path : '**' , component : PageNotFoundComponent}


];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { enableTracing : true,
                                      anchorScrolling: 'enabled',
                                      scrollPositionRestoration: 'enabled'
                                    }),
  ],
  providers : [
          {
        provide: LocationStrategy,
        useClass: PathLocationStrategy
        }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
