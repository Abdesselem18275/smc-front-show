import * as fromUserReducer from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './state';
import { Profile } from 'src/app/models/account.models';
import { RedirectDataType } from 'src/app/models/shared.models';




export const selectUserState = createFeatureSelector<State>(fromUserReducer.featureKey);


export const selectUser = createSelector(
  selectUserState,
    (state) => state.profile
  );
export const selectError = createSelector(
    selectUserState,
      (state) => state.errorMessage
    );
export const selectIsLoading = createSelector(
      selectUserState,
        (state) => state.isLoading
      );

export const selectIsUserLoaded = createSelector(
  selectUser,
  (user: Profile) => (user !== null)
  );

export const selectIsFavorite = createSelector(
  selectUser,
  selectIsUserLoaded,
  (user: Profile,isLoaded: boolean, prop: {id: number}) => (isLoaded ? user.favorites.map(fav => fav.id).includes(prop.id):false)
  );

export const selectIsAuthentificated = createSelector(
    selectUserState,
    (state) => (state.isAuthenticated)
    );
export const selectFavoritesCount = createSelector(
  selectUser,
  (user: Profile) => (user ? user.favorites.length : -1)
  );

export const selectRedirectNavigation = createSelector(
  selectUserState,
  (state) => (state.redirectUrl)
  );
