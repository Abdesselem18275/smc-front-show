import { Navigation, UrlTree } from '@angular/router';
import { Profile, UserRequest } from 'src/app/models/account.models';


export interface State {
    isLoading: boolean;
    isAuthenticated: boolean;
    errorMessage: any;
    profile: Profile;
    redirectNavigation: Navigation;
  }

export const initialState: State = {
  isLoading: false,
  isAuthenticated: false,
  errorMessage: null,
  profile: null ,
  redirectNavigation:null
};
