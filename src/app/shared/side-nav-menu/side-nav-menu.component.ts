import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { ToggleAction } from 'src/app/root-store/modal-store/actions';
import { MenuTreeData } from 'src/app/models/product.models';
import { LogoutAction } from 'src/app/root-store/user-store/actions';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/account.models';
import { UserStoreSelectors } from 'src/app/root-store/user-store';
import { LanguageType } from 'src/app/root-store/global-store/state';
import { GlobalStoreSelectors } from 'src/app/root-store/global-store';


@Component({
  selector: 'app-side-nav-menu',
  templateUrl: './side-nav-menu.component.html',
  styleUrls: ['./side-nav-menu.component.scss']
})
export class SideNavMenuComponent {
  profile$: Observable<Profile>;
  isLoading$: Observable<boolean>;
  navMenuData$: Observable<MenuTreeData[]>;
  isLogged$: Observable<boolean>;
  languageType: LanguageType;
  constructor(private store$: Store<RootStoreState.State>) {
                this.profile$ = this.store$.select(UserStoreSelectors.selectUser);
                this.isLoading$ = this.store$.select(UserStoreSelectors.selectIsLoading);
                this.isLogged$ = this.store$.select(UserStoreSelectors.selectIsAuthentificated);
                this.navMenuData$ = this.store$.select(GlobalStoreSelectors.selectNavMenuTree)
  }

  logOut(): void {
    this.store$.dispatch(LogoutAction());
  }
  login(): void {
    this.store$.dispatch(ToggleAction({key: 'loginBox'}));
  }
}
