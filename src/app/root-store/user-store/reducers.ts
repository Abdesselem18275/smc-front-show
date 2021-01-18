import { createReducer, on, Action } from '@ngrx/store';
import { initialState, State } from './state';
import * as UsersActions from './actions';

export const featureKey = 'user';

const userReducer = createReducer(
    initialState,
    on(UsersActions.LoadUserAction, (state, { payload }) => {
      const newState = {
        ...state ,
        isLoading : false,
        isAuthenticated: true,
        profile: payload
      };
      return newState;
    }),
    on(UsersActions.LoginAction, (state) => {
      const newState = {
        ...state ,
        isLoading : true,
      };
      return newState;
    }),
    on(UsersActions.FailureAction, (state, { message }) => {
      const newState = {
        ...state ,
        isLoading : false,
        errorMessage: message
      };
      return newState;
    }),
    on(UsersActions.LogoutAction, (state) => {
      const newState = {
        ...state ,
        isLoading : false,
        isAuthenticated: false,
        errorMessage: null,
        profile: null
      };
      return newState;
    }),
    on(UsersActions.RedirectForAuthentification,(state,{ redirectUrl }) => ({
        ...state,
        redirectUrl:redirectUrl ? redirectUrl : state.redirectUrl
      })),
    on(UsersActions.ToggleFavoriteAction, (state, { id }) => {
      if (state.profile == null) {
        return state;
      }
      let favorites = Object.assign([], state.profile.favorites.map(fav => fav));
      if (favorites.includes(id)) {
          favorites = favorites.filter( x => x !== id );
      } else {
          favorites.push(id);
      }
      const newState = {
        ...state,
        profile: {
          ...state.profile,
          favorites
        }
      };
      return newState;
    }),
);
export const  reducer = (state: State | undefined, action: Action)  => userReducer(state, action) ;

