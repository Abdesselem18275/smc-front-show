

export class ModalStateStore {
    searchBox: boolean;
    loginBox: boolean;
    sideMenuBox: boolean;
    filterBox: boolean;
    userCardBox: boolean;
    constructor() {
        this.searchBox = false;
        this.loginBox = false;
        this.sideMenuBox = false;
        this.filterBox = false;
        this.userCardBox = false;

    }
    isOpen() {
        return this.searchBox || this.loginBox || this.sideMenuBox || this.filterBox || this.userCardBox;
    }
  }
