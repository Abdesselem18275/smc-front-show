import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductStoreModule } from './product-store/product-store.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ParamStoreModule } from './param-store/param-store.module';
import { ModalStoreModule } from './modal-store/modal-store.module';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RouterStoreModule } from './router-store/router-store.module';
import { CustomSerializer } from './router-store/custom-route-serializer';
import { GlobalStoreModule } from './global-store/global-store.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductStoreModule,
    ParamStoreModule,
    StoreModule.forRoot({},
      {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
      },
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),
    EffectsModule.forRoot([]),
    ModalStoreModule,
    RouterStoreModule,
    GlobalStoreModule,
  ]
})
export class RootStoreModule { }
