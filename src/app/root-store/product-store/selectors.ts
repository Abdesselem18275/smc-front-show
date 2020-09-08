import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import * as fromProductState from './state';
import * as fromProductReducer from './reducers';

export interface State {
    product: fromProductState.State;
  }


  export const reducers: ActionReducerMap<State> = {
    product: fromProductReducer.reducer,
  };

  export const selectProductState = createFeatureSelector<fromProductState.State>(fromProductReducer.featureKey);

  export const selectAllProducts = createSelector(
    selectProductState,
    fromProductReducer.selectAllProducts
  );
  export const selectProductsCount = createSelector(
    selectProductState,
    (productState) => {return productState.objCount}
  );
  export const selectIsLoading = createSelector(
    selectProductState,
    (productState) => productState.isLoading
  );
  export const selectSelectedProduct = createSelector(
    selectProductState,
    (productState) => productState.selectedProduct
  );
export const selectIsBigBoxSize = createSelector(selectProductState,(state)=>state.isBigBox)

