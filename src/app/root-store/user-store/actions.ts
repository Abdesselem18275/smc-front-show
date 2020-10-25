import { createAction, props } from '@ngrx/store';

export enum ActionsType {
  LOGIN     = '[User] Login a user',
  FAILURE = '[User] Request Failure',
  LOAD_USER = '[User] Load User to store',
  LOGOUT    = '[User] Logout a  user',
  REFRECH   =  '[User] Refrech User',
  CREATE = '[User] Create new user',
  UPDATE = '[User] Update user',
  TOGGLE_FAVORITE = '[User] Toggle favorite',
  TRIGGER_FAVORITE = '[User] Trigger favorite',
  FETCH_USER_REQUESTS = '[User] Fetch User Request',
  LOAD_USER_REQUESTS = '[User] Fetch User Request',
  AUTH_REDIRECT  ='[User] Redirect for Authentification'

}
export const LoginAction = createAction(
  ActionsType.LOGIN,
  props<{ credentials: any}>()
);
export const LogoutAction = createAction(
  ActionsType.LOGOUT
  );
export const FailureAction = createAction(
  ActionsType.FAILURE,
  props<{ message: any}>()
);
export const UserRefreshAction = createAction(
  ActionsType.REFRECH
);
export const LoadUserAction = createAction(
  ActionsType.LOAD_USER,
  props<{ payload: any}>()
);
export const CreateUserAction = createAction(
  ActionsType.CREATE,
  props<{ payload: any}>()
);
export const UpdateUserAction = createAction(
  ActionsType.UPDATE,
  props<{ 
    message?:string
    payload: any}>()
);
export const ToggleFavoriteAction = createAction(
  ActionsType.TOGGLE_FAVORITE,
  props<{ id: number}>()
);

export const FetchUserRequestsAction = createAction(
  ActionsType.FETCH_USER_REQUESTS);

export const LoadUserRequestsAction = createAction(
  ActionsType.LOAD_USER_REQUESTS,
  props<{payload:any}>());

export const RedirectForAuthentification = createAction(
    ActionsType.AUTH_REDIRECT,props<{payload:any}>());