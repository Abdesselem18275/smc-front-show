/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-shadow */

import { Category, FilterCategory, MenuTreeData } from 'src/app/core/types';

export enum LanguageType {
    ENGLISH = 'English',
    FRENCH = 'Francais',
    GERMAN = 'Deutch'
}
export interface UserLanguage {
    id: string;
    languageType: string;
}


export class State  {
  language!: UserLanguage | null;
  categories!: Category[];
  filters!: FilterCategory[];
  navMenuTree!: MenuTreeData[];
  requestSubjects!: { id: number; designation: string}[];
}


export const initialState: State = {
  language : null,
  categories: [],
  filters: [],
  navMenuTree: [],
  requestSubjects: []
};

