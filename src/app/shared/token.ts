

export class ModalStateStore {
    searchBox: boolean;
    loginBox: boolean;
    sideMenuBox: boolean;
    filterBox: boolean;
    userCardBox: boolean;
    languageBox: boolean;
    constructor() {
        this.searchBox = false;
        this.loginBox = false;
        this.sideMenuBox = false;
        this.filterBox = false;
        this.userCardBox = false;
        this.languageBox = false;

    }
    isOpen() {
        return this.searchBox || this.loginBox || this.sideMenuBox || this.filterBox || this.userCardBox;
    }
    isCenterOpen() {
        return this.searchBox || this.loginBox ;
    }
  }
