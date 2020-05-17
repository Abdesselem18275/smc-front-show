import * as fromUserReducer from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './state';
import { Profile } from 'src/app/account/model';




export const selectModalState = createFeatureSelector<State>(fromUserReducer.featureKey);


export const selectUser = createSelector(
  selectModalState,
    (state) => {
        return state.user;
    }
  );
export const selectError = createSelector(
    selectModalState,
      (state) => {
          return state.errorMessage;
      }
    );
export const selectIsLoading = createSelector(
      selectModalState,
        (state) => {
            return state.isLoading;
        }
      );
export const selectIsFavorite = createSelector(
  selectUser,
  (user: Profile, prop: {id: number}) => (user.favorites.includes(prop.id))
  );
