export interface State {
    searchBox: boolean;
    loginBox: boolean;
    sideMenuBox: boolean;
    createProfileBox: boolean;
    filterBox: boolean;
    userCardBox: boolean;
    languageBox: boolean;
}
export const initialState: State = {
    searchBox: false,
    loginBox: false,
    sideMenuBox: false,
    createProfileBox: false,
    filterBox: false,
    userCardBox: false,
    languageBox: false
  };
