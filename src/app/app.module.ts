import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import {MaterialModule} from './material';


import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found/page-not-found.component';
import {ProductModule} from './product/product.module';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AwsObjectsService } from './common/aws-objects.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    ProductModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [AwsObjectsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
