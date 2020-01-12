import * as fromGlobalReducer from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './state';


export const selectModalState = createFeatureSelector<State>(fromGlobalReducer.featureKey);


export const selectLanguage = createSelector(
  selectModalState,
    (state) => {
        return state.language;
    }
  );
