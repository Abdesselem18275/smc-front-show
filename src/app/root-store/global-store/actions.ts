import { createAction, props } from '@ngrx/store';
import { UserLanguage } from './state';

export const setLanguageAction = createAction(
    '[Global] Set language',
    props<{ key: UserLanguage}>()
  );

export const loadInitDataAction = createAction(
    '[Global] Load init data',
    props<{payload: any}>()
  );
