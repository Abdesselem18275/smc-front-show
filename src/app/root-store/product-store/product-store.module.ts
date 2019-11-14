import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducer, featureKey } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature([ProductEffects])
  ]
})
export class ProductStoreModule { }
