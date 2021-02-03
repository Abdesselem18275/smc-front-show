import { createReducer, on, Action } from '@ngrx/store';
import { initialState, State } from './state';
import * as GlobalActions from './actions';

export const featureKey = 'global';


const globalReducer = createReducer(
    initialState,
    on(GlobalActions.setLanguageAction, (state, { key }) => ({
            ...state ,
            language : key
          })),
    on(GlobalActions.loadInitDataAction, (state, { payload }) => ({
          ...state ,
          categories : payload.categories,
          filters : payload.filters,
          navMenuTree : payload.navMenuTree,
          requestSubjects : payload.subjects
        })),
);


  export const reducer = (state: State | undefined, action: Action) => globalReducer(state, action);

