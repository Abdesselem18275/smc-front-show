import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import {RouterModule , Routes} from '@angular/router';


import { ProductComponent } from './product/product/product.component';
import { AccountCardComponent } from './shared/account-card/account-card.component';



const appRoutes: Routes = [
  {path : 'product' , loadChildren: () => import('./product/product.module').then(m => m.ProductModule)},
  {path : 'account' , loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
  {path: 'miscellaneous', loadChildren: () => import('./miscellaneous/miscellaneous.module').then(m => m.MiscellaneousModule) },
  {path : '' , redirectTo: '', pathMatch: 'full'}


];

@NgModule({
  imports: [
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
