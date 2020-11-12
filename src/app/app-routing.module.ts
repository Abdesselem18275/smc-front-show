import { NgModule } from '@angular/core';
import {RouterModule , Routes, ExtraOptions} from '@angular/router';
import { LocationStrategy, PathLocationStrategy, HashLocationStrategy } from '@angular/common';



const appRoutes: Routes = [
  {path : 'product' , loadChildren: async () => {
    const productModule = await import('./product/product.module')
    return productModule.ProductModule;
  }
  },
  {path : 'account' , loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
  {path: 'miscellaneous', loadChildren: () => import('./miscellaneous/miscellaneous.module').then(m => m.MiscellaneousModule) },
  {path : '' , redirectTo: '/miscellaneous/home', pathMatch: 'full'}


];
const routerOptions: ExtraOptions = {
  useHash: true,
  anchorScrolling: 'enabled',
  enableTracing: true,
  onSameUrlNavigation: 'reload',
  relativeLinkResolution: 'corrected',
  scrollPositionRestoration:"enabled"
};
@NgModule({
  providers : [
    {
  provide: LocationStrategy,
  useClass: PathLocationStrategy
  }
],
  imports: [
    RouterModule.forRoot(appRoutes, routerOptions),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
