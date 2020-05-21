import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, StoreConfig } from '@ngrx/store';
import { featureKey, reducer } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './effects';
import { SmcAuthService } from 'src/app/account/service/smc-auth.service';
import { State } from './state';

export const USER_CONFIG_TOKEN = new InjectionToken<StoreConfig<State>>('User Config');
 
export function getConfig(as: SmcAuthService): StoreConfig<State> {
  // return the config synchronously.
  return {
    initialState: as.getInitialState(),
  };
}

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(featureKey, reducer,USER_CONFIG_TOKEN),
    //StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature([UserEffects]),
    CommonModule
  ],
  providers: [
    {
      provide: USER_CONFIG_TOKEN,
      deps: [SmcAuthService],
      useFactory: getConfig,
    },
  ],
})
export class UserStoreModule { }
