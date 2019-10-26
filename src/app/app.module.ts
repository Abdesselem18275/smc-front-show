import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import {MaterialModule} from './material';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found/page-not-found.component';
import {ProductModule} from './product/product.module';
import { AppRoutingModule } from './app-routing.module';
import { ConfigService } from './product/service/config.service';
import { AccountModule } from './account/account.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';



export function loadCategories(configService: ConfigService) {
  return () => configService.getCategories();
}
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
      ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    ProductModule,
    AccountModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
        {
      provide: APP_INITIALIZER,
      useFactory: loadCategories,
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
