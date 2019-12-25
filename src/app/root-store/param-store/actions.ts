import { createAction, props, Action } from '@ngrx/store';
import { Param } from 'src/app/product/model';

export enum ActionsType {
  UPDATE     = '[Param] Add Or Update',
  UPDATES = '[Param] Multiple Add Or Update',
  DELETE_MANY   = '[Param] Delete',
  NEXT_PAGE = '[Param] Next Page',
  CLEAR = '[Param] Clear',
}



export const AddOrUpdateAction = createAction(
    ActionsType.UPDATE,
    props<{ param: Param}>()
  );

export const AddOrUpdateManyAction = createAction(
    ActionsType.UPDATES,
    props<{ params: Param[]}>()
  );

export const DeleteManyAction = createAction(
    ActionsType.DELETE_MANY,
    props<{ ids: string[]}>()
  );

export const ClearAction = createAction(
    ActionsType.CLEAR
  );

  export const NextPageAction = createAction(
    ActionsType.NEXT_PAGE
  );


