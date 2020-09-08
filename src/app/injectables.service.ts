import { InjectionToken } from '@angular/core';
import { UserLanguage, LanguageType } from './root-store/global-store/state';
import { ConfigService } from './product/service/config.service';

const LANGUAGE_LIST: UserLanguage[] = [
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
];
const SMC_API_URL = () => 'http://ec2-15-236-55-71.eu-west-3.compute.amazonaws.com/api';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LOCAL_API_URL = () => 'http://127.0.0.1:8000/api';

const getBaseUrl = ():string => {

 // return document.getElementsByTagName('base')[0].href.match(/\/\w{2}\//).pop();
  return '';
}
const APP_TOKEN_KEY = () => 'smcToken';
const APP_PROFILE_ID = () => 'smcId';


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

export const LANGUAGE_CONFIG = new InjectionToken<UserLanguage[]>('config.service');
export function loadInitData(configService: ConfigService) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ():Promise<any> => configService.loadInitials();
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const InjectablesService: Array<any> = [
  { provide: LANGUAGE_CONFIG, useValue: LANGUAGE_LIST },
  { provide: 'APP_BASE_HREF' , useFactory: getBaseUrl }
];

