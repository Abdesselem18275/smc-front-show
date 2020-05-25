import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, StoreConfig } from '@ngrx/store';
import { featureKey, reducer} from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ParamEffects } from './effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature([ParamEffects])
  ],
})
export class ParamStoreModule { }
