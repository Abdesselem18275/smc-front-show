import * as ModalActions from './actions';
import { createReducer, Action, on } from '@ngrx/store';
import { initialState, State } from './state';


export const featureKey = 'modal';


const modalReducer = createReducer(
    initialState,
    on(ModalActions.ToggleAction, (state, { key }) => {
        console.warn(key);
        return {
            ...initialState ,
            [key] : !state[key]
          };
    }),
    on(ModalActions.CloseAllAction, (state) => {
      return initialState;
  })
);


  export function reducer(state: State | undefined, action: Action) {
    return modalReducer(state, action);
  }
