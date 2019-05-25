import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy,PathLocationStrategy } from '@angular/common';
import {RouterModule , Routes} from '@angular/router';


import { PageNotFoundComponent} from './page-not-found/page-not-found/page-not-found.component';
import { ProductComponent } from './product/product/product.component';


const appRoutes: Routes = [

  {path : '' , component : ProductComponent},
  {path : '**' , component : PageNotFoundComponent},

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
