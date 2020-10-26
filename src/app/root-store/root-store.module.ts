import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductStoreModule } from './product-store/product-store.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ParamStoreModule } from './param-store/param-store.module';
import { ModalStoreModule } from './modal-store/modal-store.module';
import { GlobalStoreModule } from './global-store/global-store.module';
import { UserStoreModule } from './user-store/user-store.module';
import { RouterStoreModule } from './router-store';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductStoreModule,
    ParamStoreModule,
    RouterStoreModule,
    StoreModule.forRoot({},
      {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      },
    }),
    ModalStoreModule,
    GlobalStoreModule,
    UserStoreModule,
    EffectsModule.forRoot([]),
  ]
})
export class RootStoreModule { }
