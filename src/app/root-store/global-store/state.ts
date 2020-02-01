import { APP_BASE_HREF } from "@angular/common";

export enum LanguageType {
    ENGLISH = 'English',
    FRENCH = 'Francais',
    GERMAN = 'Deutch'
}
export interface UserLanguage {
    id: string;
    LanguageType: string;
}

function getType(base:string)  {
  switch(base) {
    case 'fr':
      return LanguageType.FRENCH
    case 'en':
      return LanguageType.ENGLISH
    case 'de':
      return LanguageType.GERMAN
    default:
      return LanguageType.ENGLISH

  }
}
export class State  {
  language: UserLanguage;
}


export const initialState: State = {
  language : {
    id : APP_BASE_HREF.toString(),
    LanguageType : getType(APP_BASE_HREF.toString()) }
};

