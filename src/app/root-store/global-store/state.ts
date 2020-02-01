import { APP_BASE_HREF, LocationStrategy } from "@angular/common";


export enum LanguageType {
    ENGLISH = 'English',
    FRENCH = 'Francais',
    GERMAN = 'Deutch'
}
export interface UserLanguage {
    id: string;
    LanguageType: string;
}


export class State  {
  language: UserLanguage;
}


export const initialState: State = {
  language : {
    id : 'en',
    LanguageType : LanguageType.ENGLISH }
};

