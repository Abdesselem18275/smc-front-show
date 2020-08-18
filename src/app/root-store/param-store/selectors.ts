import * as fromParamState from './state';
import * as fromParamReducer from './reducers';

import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { selectProductsCount } from '../product-store/selectors';
import { ParamType, Param } from 'src/app/models/product.models';

export interface State {
    param: fromParamState.State;
  }
export const reducers: ActionReducerMap<State> = {
    param: fromParamReducer.reducer,
  };

  export const selectParamState = createFeatureSelector<fromParamState.State>(fromParamReducer.featureKey);

  export const selectAllParams = createSelector(
    selectParamState,
    fromParamReducer.selectAllParams
  );

  export const selectAllParamsByType = createSelector(
    selectAllParams,
    (allEntities:Param[] , props: {type:ParamType}) => allEntities.filter(x => x.type === props.type));

  export const selectPageParam = createSelector(
    selectAllParams,
    selectProductsCount,
    (AllParams , ProductsCount) => {
      const page_number = AllParams.filter(x => x.type === ParamType.PAGE).shift();
        return {
          page_number : page_number ? page_number.value : '1',
          count : ProductsCount
        };
    }
  );

  export const selectAllParamsByTypeCount = createSelector(
    selectAllParamsByType,
    (allEntities) => {
        return allEntities.length;
    }
  );

  export const selectIsParamExist= createSelector(
    selectAllParamsByType,
    (allEntities) => {
        return allEntities.length > 0;
    }
  );
