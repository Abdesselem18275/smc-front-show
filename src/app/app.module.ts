import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import {MaterialModule} from './material';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found/page-not-found.component';
import {ProductModule} from './product/product.module';
import { AppRoutingModule } from './app-routing.module';
import { AccountModule } from './account/account.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootStoreModule } from './root-store/root-store.module';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { LanguageService } from './shared/service/language.service';
import { InjectablesService, loadInitData } from './injectables.service';
import { ConfigService } from './product/service/config.service';
import { httpInterceptorProviders } from './http-interceptors';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
      ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    MaterialModule,
    AccountModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RootStoreModule,
    EffectsModule.forRoot([AppEffects]),
    ProductModule,

  ],
  providers: [
    httpInterceptorProviders,
    InjectablesService,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}
    },
    {
      provide: APP_INITIALIZER,
      useFactory: loadInitData,
      deps: [ConfigService],
      multi: true
    },
    LanguageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
