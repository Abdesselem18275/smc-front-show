import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { reducer, featureKey } from './reducers';
import { StoreModule } from '@ngrx/store';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(featureKey, reducer),

  ]
})
export class RouterStoreModule { }
