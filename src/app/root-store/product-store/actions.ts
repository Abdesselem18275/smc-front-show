import { createAction, props, Action } from '@ngrx/store';
import { ProductShort } from 'src/app/product/model';

export enum ActionsType {
  UPDATE  = '[Product] Add Or Update',
  UPDATES = '[Product] Multiple Add Or Update',
  CLEAR = '[Product] Clear All',
  IS_LOADING = '[Product] Is Loading',
  REMOVE = '[Product] Remove',
  TOGGLE_BOX_SIZE = '[Product] Toggle box size',
  LOAD_PRODUCT = '[Product] Load selected product',
}

export const AddOrUpdateAction = createAction(
  ActionsType.UPDATE,
  props<{ product: ProductShort}>()
);

export const AddOrUpdateManyAction = createAction(
  ActionsType.UPDATES,
  props<{ results: any}>()
);

export const ClearAllAction = createAction(
  ActionsType.CLEAR,
);

export const LoadRequestAction = createAction(
  ActionsType.IS_LOADING,
);

export const ToggleBoxSizeAction = createAction(
  ActionsType.TOGGLE_BOX_SIZE,
);

export const DeleteProduct = createAction(ActionsType.REMOVE, props<{ id: string }>());
export const LoadProductAction = createAction(ActionsType.LOAD_PRODUCT, props<{ product: ProductShort }>());
