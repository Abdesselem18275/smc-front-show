import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductStoreModule } from './product-store/product-store.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ParamStoreModule } from './param-store/param-store.module';
import { ModalStoreModule } from './modal-store/modal-store.module';


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
        strictActionSerializability: true,
      },
    }),
    EffectsModule.forRoot([]),
    ModalStoreModule,
  ]
})
export class RootStoreModule { }
