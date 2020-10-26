import { ActivatedRouteSnapshot, Params } from '@angular/router';
import { Profile } from 'src/app/models/account.models';
import { Param } from 'src/app/models/product.models';


export interface State {
    isLoading: boolean;
    isAuthenticated: boolean;
    errorMessage: any;
    profile: Profile;
    redirectUrl: string;

  }

export const initialState: State = {
  isLoading: false,
  isAuthenticated: false,
  errorMessage: null,
  profile: null ,
  redirectUrl:null
};
