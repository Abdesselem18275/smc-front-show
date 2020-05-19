import { Profile } from "src/app/account/model";
import { TOKEN_KEY } from "src/app/injectables.service";


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
