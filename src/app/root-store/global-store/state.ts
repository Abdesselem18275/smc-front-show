
export enum LanguageType {
    ENGLISH = 'English',
    FRENCH = 'Francais',
    GERMAN = 'Deutch'
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

