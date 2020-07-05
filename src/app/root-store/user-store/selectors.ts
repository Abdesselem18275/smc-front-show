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

export const selectIsUserLoaded = createSelector(
  selectUser,
  (user: Profile) => (user !== null)
  );

export const selectIsFavorite = createSelector(
  selectUser,
  selectIsUserLoaded,
  (user: Profile,isLoaded, prop: {id: number}) => (isLoaded ? user.favorites.map(fav => fav.id).includes(prop.id):false)
  );

export const selectIsAuthentificated = createSelector(
    selectModalState,
    (state) => (state.isAuthenticated)
    );
export const selectFavoritesCount = createSelector(
  selectUser,
  selectIsUserLoaded,
  (user: Profile,isLoaded, ) => (isLoaded ? user.favorites.length : -1)
  );