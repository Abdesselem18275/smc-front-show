import { createReducer, on, Action } from '@ngrx/store';
import { initialState, adapter, State } from './state';
import * as ParamActions from './actions';



export const featureKey = 'param';

const paramReducer = createReducer(
    initialState,
    // on(ParamActions.AddOrUpdateAction, (state, { param }) => {
    //   return adapter.upsertOne(param, state);
    // }),
    on(ParamActions.AddOrUpdateManyAction, (state, { params }) => {
      return adapter.upsertMany(params, state);
    }),
    on(ParamActions.DeleteAction, (state, { key }) => {
        return adapter.removeOne(key, state);
      }),
    on(ParamActions.NextPageAction, (state) => {
        return state;
      }),
    on(ParamActions.ClearAction, (state) => {
        return adapter.removeAll(state);
      }),
  );

  export function reducer(state: State | undefined, action: Action) {
    return paramReducer(state, action);
  }

  export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
  } = adapter.getSelectors();


  export const selectAllParams = selectAll;