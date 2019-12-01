import * as fromModalState from './state';
import * as fromModalActions from './actions';
import * as fromModalReducers from './reducers';

describe('TOGGLE action', () => {
    it('should set modal to true ', () => {
      const  initialState  = fromModalState.initialState;
      const prevState = { ...initialState, languageBox: true };
      const requestedState =  { ...initialState, languageBox: false };
      const action = fromModalActions.ToggleAction({key: 'languageBox'});
      const state = fromModalReducers.reducer(prevState, action);
      expect(state).toEqual(requestedState);
    });
  });

  describe('Clear ALL action', () => {
    it('should set all modals to false ', () => {
      const  initialState  = fromModalState.initialState;
      const prevState = { ...initialState, languageBox: true };
      const action = fromModalActions.CloseAllAction;
      const state = fromModalReducers.reducer(prevState, action);
      expect(state).toEqual(initialState);
    });
  });

