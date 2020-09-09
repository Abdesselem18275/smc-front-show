import { Profile, UserRequest } from 'src/app/models/account.models';


export interface State {
    isLoading: boolean;
    isAuthenticated: boolean;
    errorMessage: any;
    profile: Profile;
  }

export const initialState: State = {
  isLoading: false,
  isAuthenticated: false,
  errorMessage: null,
  profile: null ,
};
