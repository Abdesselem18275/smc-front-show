
import { APP_INITIALIZER } from '@angular/core';

import { PlatformLocation,Location,CommonModule, APP_BASE_HREF, } from '@angular/common';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { ConfigService } from './shared/services/config.service';

// const loadInitData = (configService: ConfigService): () => Promise<any> => () => configService.loadInitData();

// const loadProfile = (configService: ConfigService): () => Promise<any> => () => configService.loadProfile();

const init = (configService: ConfigService): () => Promise<any> => () => configService.init();

const getBaseUrl = (s: PlatformLocation): string => {
    const baseUrl = Location.stripTrailingSlash(s.getBaseHrefFromDOM());
    return baseUrl.length > 2 ? baseUrl :'/en-US';
  };

export const providers: Array<any> = [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: loadInitData,
    //   deps: [ConfigService],
    //   multi: true
    // },
    // {
    //     provide: APP_INITIALIZER,
    //     useFactory: loadProfile,
    //     deps: [ConfigService],
    //     multi: true
    //   },
      {
        provide: APP_INITIALIZER,
        useFactory: init,
        deps: [ConfigService],
        multi: true
      },
    { provide: 'APP_BASE_HREF' , useFactory: getBaseUrl,deps: [PlatformLocation] },
    {
        provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000}
      }
  ];
