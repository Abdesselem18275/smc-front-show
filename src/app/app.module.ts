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
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('541271383309-k3e64igmtqkenbosdl6mm7uo7og3jggg.apps.googleusercontent.com')
  }]);
export function provideConfig() {
    return config;
  }

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
    SocialLoginModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
        {
      provide: APP_INITIALIZER,
      useFactory: loadCategories,
      deps: [ConfigService],
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
