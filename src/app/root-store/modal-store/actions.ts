import { createAction, props } from '@ngrx/store';

export enum ActionsType {
  TOGGLE     = '[Modal] toggle modal',
  TOGGLE_USER_CARD = '[Modal] toggle user card modal',
  CLOSE_ALL = '[Modal] close all modals',
  TOGGLE_WITH_AUTH = '[Modal] Toggle with authorization modal'
}


export const ToggleAction = createAction(
    ActionsType.TOGGLE,
    props<{ key: string}>()
  );

export const ToggleUserCard = createAction(ActionsType.TOGGLE_USER_CARD);

export const ToggleWithAuth = createAction(ActionsType.TOGGLE_WITH_AUTH,props<{ key: string}>());

export const CloseAllAction = createAction(
    ActionsType.CLOSE_ALL);
