import * as fromModalReducer from './reducers';
import { State } from './state';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export const selectModalState = createFeatureSelector<State>(fromModalReducer.featureKey);


export const selectModalStateByType = createSelector(
  selectModalState,
    (state , props) => {
        return state[props.key];
    }
  );

  export const selectAllModalState = createSelector(
    selectModalState,
    (modalState) => modalState
  );
  export const selectOverlayedModal = createSelector(
    selectModalState,
    (modalState) => modalState.loginBox || modalState.sideMenuBox
  );
