import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { RootStoreModule } from './root-store/root-store.module';
import { EffectsModule } from '@ngrx/effects';
import { httpInterceptorProviders } from './http-interceptors';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { RootEffects } from './root-store/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule} from '@angular/common';
import {  providers  } from './providers'
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './root-store/router-store/custom-route-serializer';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
      ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RootStoreModule,
    EffectsModule.forRoot([RootEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    RouterModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),
  ],
  providers: [
    httpInterceptorProviders,
    providers,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
