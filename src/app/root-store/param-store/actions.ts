import { createAction, props, Action } from '@ngrx/store';
import { Param, Category } from 'src/app/models/product.models';

export enum ActionsType {
  UPDATE     = '[Param] Add Or Update',
  UPDATES = '[Param] Multiple Add Or Update',
  DELETE_MANY   = '[Param] Delete many',
  NEXT_PAGE = '[Param] Next Page',
  CLEAR = '[Param] Clear',
  LOAD_ACTIVE_CATEGORY = '[Param] Load active category'
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
  export const LoadActiveCategoryAction = createAction(
    ActionsType.LOAD_ACTIVE_CATEGORY,
    props<{ payload: Category}>()
  );


