import { Injectable, InjectionToken } from '@angular/core';
import { UserLanguage, LanguageType } from './root-store/global-store/state';
import { ConfigService } from './product/service/config.service';
import { LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';

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
const SMC_API_URL = () => 'http://ec2-35-180-37-122.eu-west-3.compute.amazonaws.com:8080/api';
const LOCAL_API_URL = () => 'http://127.0.0.1:8000/api';
const getBaseUrl = () => {

 // return document.getElementsByTagName('base')[0].href.match(/\/\w{2}\//).pop();
  return '';
}


export const API_URL = new InjectionToken<string>('ApiUrl', {
  providedIn: 'root',
  factory: SMC_API_URL
});


export const LANGUAGE_CONFIG = new InjectionToken<UserLanguage[]>('config.service');
export function loadInitData(configService: ConfigService) {
  return () => configService.loadInitials();
}
export const InjectablesService: Array<any> = [
  { provide: LANGUAGE_CONFIG, useValue: LANGUAGE_LIST },
  { provide: 'APP_BASE_HREF' , useFactory: getBaseUrl }
];
