import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import {MaterialModule} from './material';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found/page-not-found.component';
import {ProductModule} from './product/product.module';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigService } from './product/service/config.service';
import { AccountModule } from './account/account.module';
import { CookieService } from 'ngx-cookie-service';



export function loadCategories(configService: ConfigService) {
  return () => configService.getCategories();
}
export function loadFilters(configService: ConfigService) {
  return () => configService.getFilters();
}
export function loadCollections(configService: ConfigService) {
  return () => configService.getCollections();
}
export function loadIcons(configService: ConfigService) {
  return () => configService.loadIconRegistry();
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
    AppRoutingModule,
  ],
  providers: [
    CookieService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadCategories,
      deps: [ConfigService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: loadFilters,
      deps: [ConfigService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: loadCollections,
      deps: [ConfigService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: loadIcons,
      deps: [ConfigService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
