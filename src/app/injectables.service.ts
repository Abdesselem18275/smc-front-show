import { InjectionToken } from '@angular/core';
import { UserLanguage, LanguageType } from './root-store/global-store/state';
import { ConfigService } from './product/service/config.service';
import { PlatformLocation,Location } from '@angular/common';

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
const SMC_API_URL = () => 'http://ec2-15-188-104-88.eu-west-3.compute.amazonaws.com/smc/api';
const getBaseUrl = (s: PlatformLocation):string => {
  const baseUrl = Location.stripTrailingSlash(s.getBaseHrefFromDOM())
  console.warn(baseUrl)
  return baseUrl.length > 2 ? baseUrl :'/en-US'
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

export const SUPPORTED_LANGUAGES = new InjectionToken<UserLanguage[]>('config.service', {
  providedIn: 'root',
  factory: LANGUAGE_LIST
});


export function loadInitData(configService: ConfigService) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ():Promise<any> => configService.loadInitials();
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const InjectablesService: Array<any> = [
  { provide: 'APP_BASE_HREF' , useFactory: getBaseUrl,deps: [PlatformLocation] }
];

