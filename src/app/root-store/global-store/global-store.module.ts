import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, StoreConfig } from '@ngrx/store';
import { featureKey, reducer } from './reducers';
import { State } from './state';
import { GlobalConfigService } from 'src/app/shared/services/global-config.service';


export const GLOBAL_CONFIG_TOKEN = new InjectionToken<StoreConfig<State>>('Global Config');
export const  getConfig = (gf: GlobalConfigService): StoreConfig<State> => ({
  initialState: gf.getInitialGlobalConfig(
  ),
});
@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(featureKey, reducer,GLOBAL_CONFIG_TOKEN),
    CommonModule
  ],
  providers: [
    {
      provide: GLOBAL_CONFIG_TOKEN,
      deps: [GlobalConfigService],
      useFactory: getConfig,
    },
  ],
})
export class GlobalStoreModule { }
