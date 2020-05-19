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

export const selectIsUserRefreshed = createSelector(
  selectUser,
  (user: Profile) => (user !== null)
  );

export const selectIsFavorite = createSelector(
  selectUser,
  selectIsUserRefreshed,
  (user: Profile,isRefreshed, prop: {id: number}) => (isRefreshed ? user.favorites.includes(prop.id):isRefreshed)
  );
  export const selectIsAuthentificated = createSelector(
    selectModalState,
    (state) => (state.isAuthenticated)
    );