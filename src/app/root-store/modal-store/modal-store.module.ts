import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { featureKey, reducer } from './reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ModalEffects } from './effects';



@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature([ModalEffects]),
    CommonModule
  ]
})
export class ModalStoreModule { }
