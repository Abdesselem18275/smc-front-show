import { createReducer, on, Action } from '@ngrx/store';
import { initialState, State, adapter } from './state';
import * as ProductActions from './actions';

export const featureKey = 'product';

const productReducer = createReducer(
    initialState,
    on(ProductActions.AddOrUpdateAction, (state, { product }) => {
      return adapter.upsertOne(product, state);
    }),
    on(ProductActions.AddOrUpdateManyAction, (state, { results }) => {
      const newState = {
        ...state ,
        isLoading : false,
        objCount : results['count']
      };
      return adapter.upsertMany(results['results'], newState);
    }),
    on(ProductActions.ClearAllAction, (state) => {
      return adapter.removeAll(initialState);
    }),
    on(ProductActions.LoadRequestAction, (state) => {
      return {
        ...state ,
        isLoading : true
      };
    }),
    on(ProductActions.DeleteProduct, (state, { id }) => {
      return adapter.removeOne(id, state);
    }),
    on(ProductActions.ToggleBoxSizeAction, (state) => {
      return {
        ...state ,
        isBigBox : !state.isBigBox
      };
    }),
    on(ProductActions.LoadProductAction, (state, { product }) => {
      return {
        ...state ,
        selectedProduct : product,
        isLoading : false
      };
    }),
);

  export function reducer(state: State | undefined, action: Action) {
    return productReducer(state, action);
  }
  export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
  } = adapter.getSelectors();


  export const selectAllProducts = selectAll;
