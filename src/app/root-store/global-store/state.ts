import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export enum LanguageType {
    ENGLISH = 'English',
    FRENCH = 'French',
    GERMAN = 'German'
}
export interface UserLanguage {
    id: string;
    LanguageType: string;
}

export interface State  {
  language: UserLanguage;
}
export const initialState: State = {
  language : {
    id : 'En',
    LanguageType : LanguageType.ENGLISH }
};

