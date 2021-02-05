import { NgModule } from '@angular/core';
import {RouterModule , Routes, ExtraOptions} from '@angular/router';



const appRoutes: Routes = [
  {path : 'product' , loadChildren: async () => {
    const productModule = await import('./product/product.module');
    return productModule.ProductModule;
  }
  },
  {path : 'account' , loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
  {path: 'miscellaneous', loadChildren: () => import('./miscellaneous/miscellaneous.module').then(m => m.MiscellaneousModule) },
  {path : '' , redirectTo: '/miscellaneous/home', pathMatch: 'full'}


];
const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  enableTracing: true,
  scrollPositionRestoration:'top'
};
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, routerOptions),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
