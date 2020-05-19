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
        user: payload
      };
      console.warn(newState);
      return newState;
    }),
    on(UsersActions.LoginAction, (state) => {
      const newState = {
        ...state ,
        isLoading : true,
      };
      return newState;
    }),
    on(UsersActions.UserRefreshAction, (state) => {
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
        user: null
      };
      return newState;
    }),
    on(UsersActions.ToggleFavoriteAction, (state, { id }) => {
      if (state.user == null) {
        return state;
      }
      let favorites = Object.assign([], state.user.favorites);
      if (favorites.includes(id)) {
          favorites = favorites.filter( x => x !== id );
      } else {
          favorites.push(id);
      }
      const newState = {
        ...state,
        user: {
          ...state.user,
          favorites
        }
      };
      return newState;
    }),
);
export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}
