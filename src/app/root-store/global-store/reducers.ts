import { createReducer, on, Action } from "@ngrx/store";
import { initialState, State } from "./state";
import * as GlobalActions from './actions';

export const featureKey = 'global';


const globalReducer = createReducer(
    initialState,
    on(GlobalActions.SetLanguageAction, (state, { key }) => {
        return {
            ...state ,
            language : key
          };
    }),
    on(GlobalActions.LoadInitDataAction, (state, { payload }) => {
      return {
          ...state ,
          categories : payload['categories'],
          filters : payload['filters'],
          navMenuTree : payload['navMenuTree']
        };
  }),
);


  export function reducer(state: State | undefined, action: Action) {
    return globalReducer(state, action);
  }