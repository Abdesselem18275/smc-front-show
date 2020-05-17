import { Profile } from "src/app/account/model";


export interface State {
    isLoading: boolean;
    isAuthenticated: boolean;
    errorMessage: any;
    user: Profile;
  }

export const initialState: State = {
  isLoading: false,
  isAuthenticated: false,
  errorMessage: null,
  user: null };
