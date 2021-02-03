import { Profile } from 'src/app/models/account.models';


export interface State {
    isLoading: boolean;
    isAuthenticated: boolean;
    errorMessage: any;
    profile?: Profile;
    redirectUrl?: string;

  }

export const initialState: State = {
  isLoading: false,
  isAuthenticated: false,
  errorMessage: null
};
