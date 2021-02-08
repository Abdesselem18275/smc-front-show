
import { APP_INITIALIZER } from '@angular/core';

import { ConfigService } from './shared/service/config.service';
import { PlatformLocation,Location,CommonModule, APP_BASE_HREF, } from '@angular/common';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

function loadInitData(configService: ConfigService) {
    return ():Promise<any> => configService.loadInitials();
  }
function loadProfile(configService: ConfigService) {
    return ():Promise<any> => configService.loadProfile();
  }
  function loadLocales(configService: ConfigService) {
    return ():Promise<any> => configService.loadLocales();
  }
  
const getBaseUrl = (s: PlatformLocation):string => {
    const baseUrl = Location.stripTrailingSlash(s.getBaseHrefFromDOM())
    return baseUrl.length > 2 ? baseUrl :'/en-US'
  }

export const providers: Array<any> = [
    {
      provide: APP_INITIALIZER,
      useFactory: loadInitData,
      deps: [ConfigService],
      multi: true
    },
    {
        provide: APP_INITIALIZER,
        useFactory: loadProfile,
        deps: [ConfigService],
        multi: true
      },
      {
        provide: APP_INITIALIZER,
        useFactory: loadLocales,
        deps: [ConfigService],
        multi: true
      },
    { provide: 'APP_BASE_HREF' , useFactory: getBaseUrl,deps: [PlatformLocation] },
    {
        provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000}
      }
  ];