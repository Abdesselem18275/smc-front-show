import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import {MaterialModule} from './material';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found/page-not-found.component';
import {ProductModule} from './product/product.module';
import { AppRoutingModule } from './app-routing.module';
import { ConfigService, LANGUAGE_CONFIG, LANGUAGE_LIST, loadInitData } from './product/service/config.service';
import { AccountModule } from './account/account.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootStoreModule } from './root-store/root-store.module';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';



registerLocaleData(localeFr, 'fr');

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
    BrowserAnimationsModule,
    RootStoreModule,
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}
    },
    {
      provide: APP_INITIALIZER,
      useFactory: loadInitData,
      deps: [ConfigService],
      multi: true
    },
    { provide: LANGUAGE_CONFIG, useValue: LANGUAGE_LIST },
 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
