import { createAction, props, Action } from '@ngrx/store';
import { Param } from 'src/app/product/model';

export enum ActionsType {
  UPDATE     = '[Param] Add Or Update',
  UPDATES = '[Param] Multiple Add Or Update',
  DELETE   = '[Param] Delete',
  NEXT_PAGE = '[Param] Next Page',
  CLEAR = '[Param] Clear'
}



export const AddOrUpdateAction = createAction(
    ActionsType.UPDATE,
    props<{ param: Param}>()
  );

export const AddOrUpdateManyAction = createAction(
    ActionsType.UPDATES,
    props<{ params: Param[]}>()
  );

export const DeleteAction = createAction(
    ActionsType.DELETE,
    props<{ key: string}>()
  );

export const ClearAction = createAction(
    ActionsType.DELETE
  );

  export const NextPageAction = createAction(
    ActionsType.NEXT_PAGE
  );


