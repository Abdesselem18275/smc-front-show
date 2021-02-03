/* eslint-disable @typescript-eslint/naming-convention */
import { createAction, props, Action } from '@ngrx/store';
import { Product } from 'src/app/core/types';

// eslint-disable-next-line no-shadow
export enum ProductActionsType {
  UPDATE  = '[Product] Add Or Update',
  SET =  '[Product] Set products',
  UPDATES = '[Product] Multiple Add Or Update',
  CLEAR = '[Product] Clear All',
  IS_LOADING = '[Product] Is Loading',
  REMOVE = '[Product] Remove',
  TOGGLE_BOX_SIZE = '[Product] Toggle box size',
  LOAD_PRODUCT = '[Product] Load selected product',
}

export const AddOrUpdateAction = createAction(
  ProductActionsType.UPDATE,
  props<{ product: Product}>()
);

export const AddOrUpdateManyAction = createAction(
  ProductActionsType.UPDATES,
  props<{ results: any}>()
);

export const ClearAllAction = createAction(
  ProductActionsType.CLEAR,
);

export const LoadRequestAction = createAction(
  ProductActionsType.IS_LOADING,
);

export const ToggleBoxSizeAction = createAction(
  ProductActionsType.TOGGLE_BOX_SIZE,
);
export const SetManyProductsAction = createAction(
  ProductActionsType.SET,
  props<{ payload: any}>()
);
export const DeleteProduct = createAction(ProductActionsType.REMOVE, props<{ id: string }>());
export const LoadProductAction = createAction(ProductActionsType.LOAD_PRODUCT, props<{ product: Product }>());
