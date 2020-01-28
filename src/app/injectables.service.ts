import { Injectable, InjectionToken } from '@angular/core';
import { UserLanguage, LanguageType } from './root-store/global-store/state';
import { ConfigService } from './product/service/config.service';

const LANGUAGE_LIST: UserLanguage[] = [
  {
    id: 'Fr',
    LanguageType: LanguageType.FRENCH
  },
  {
    id: 'En',
    LanguageType: LanguageType.ENGLISH

  }, {
    id: 'De',
    LanguageType: LanguageType.GERMAN
  }
];
const SMC_API_URL = () => 'https://show-case-api.herokuapp.com/api';


export const API_URL = new InjectionToken<string>('ApiUrl', {
  providedIn: 'root',
  factory: SMC_API_URL
});
export const LANGUAGE_CONFIG = new InjectionToken<UserLanguage[]>('config.service');
export function loadInitData(configService: ConfigService) {
  return () => configService.loadInitials();
}
export const InjectablesService: Array<any> = [
  { provide: LANGUAGE_CONFIG, useValue: LANGUAGE_LIST }
];

