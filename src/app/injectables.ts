import { InjectionToken } from '@angular/core';
import { UserLanguage, LanguageType } from './root-store/global-store/state';

 const LANGUAGE_LIST = () =>([
  {
    id: 'fr-FR',
    LanguageType: LanguageType.FRENCH
  },
  {
    id: 'en-US',
    LanguageType: LanguageType.ENGLISH

  }, {
    id: 'de-DE',
    LanguageType: LanguageType.GERMAN
  }
]);
const SMC_API_URL = () => 'http://backend.smcuivre.com/smc/api';

const APP_TOKEN_KEY = () => 'smcToken';
const APP_PROFILE_ID = () => 'smcId';
const PARAM_KEYS_MAP = () => ({
  PAGE:'page',
  SEARCH:'search',
  CAT_DESIGNATION:'categories__designation__in'
});
export const QUERY_PARAM_KEYS = new InjectionToken<any>('ParamKeys', {
  providedIn: 'root',
  factory: PARAM_KEYS_MAP
});
export const API_URL = new InjectionToken<string>('ApiUrl', {
  providedIn: 'root',
  factory: SMC_API_URL
});
export const TOKEN_KEY = new InjectionToken<string>('TokenKey', {
  providedIn: 'root',
  factory: APP_TOKEN_KEY
});
export const PROFILE_ID = new InjectionToken<string>('ProfileId', {
  providedIn: 'root',
  factory: APP_PROFILE_ID
});

export const SUPPORTED_LANGUAGES = new InjectionToken<UserLanguage[]>('config.service', {
  providedIn: 'root',
  factory: LANGUAGE_LIST
});




