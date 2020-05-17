import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { reducer, featureKey } from './reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature([RouterEffects])
  ]
})
export class RouterStoreModule { }
