import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { featureKey, reducer } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './effects';



@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature([UserEffects]),
    CommonModule
  ]
})
export class UserStoreModule { }
