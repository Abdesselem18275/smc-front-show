import { Category, FilterCategory, MenuTreeData } from "src/app/product/model";

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
  categories: Category[];
  filters: FilterCategory[];
  navMenuTree: MenuTreeData[];
}


export const initialState: State = {
  language : {
    id : 'en',
    LanguageType : LanguageType.ENGLISH },
  categories: [],
  filters: [],
  navMenuTree: [],
};

