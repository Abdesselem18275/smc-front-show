import { Component, Inject} from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { LogoutAction } from 'src/app/root-store/user-store/actions';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/account.models';
import { UserStoreSelectors } from 'src/app/root-store/user-store';
import { UserLanguage } from 'src/app/root-store/global-store/state';
import { GlobalStoreSelectors } from 'src/app/root-store/global-store';
import { Category, MenuTreeData } from 'src/app/models/product.models';
import { GlobalStateService } from '../../state/global-state.service';
import { Country, Currency } from 'src/app/models/shared.models';
import { selectLanguage } from 'src/app/root-store/global-store/selectors';
import { DialogManagerService } from '../../services/dialog-manager.service';
import { map } from 'rxjs/operators';
import { SUPPORTED_LANGUAGES } from 'src/app/injectables';


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
  rootCategories$: Observable<Category[]>;
  paimentCurrency$: Observable<Currency>;
  shippingCountry$: Observable<Country>;
  language$: Observable<UserLanguage | null>;
  initials$: Observable<string>;
  languageList: UserLanguage[];
  constructor(
    private dms: DialogManagerService,
    private gss: GlobalStateService,
    @Inject(SUPPORTED_LANGUAGES) languageList: UserLanguage[],
    private store$: Store<RootStoreState.State>) {
      this.languageList = languageList;
      this.profile$ = this.store$.select(UserStoreSelectors.selectUser);
      this.isLoading$ = this.store$.select(UserStoreSelectors.selectIsLoading);
      this.isLogged$ = this.store$.select(UserStoreSelectors.selectIsAuthentificated);
      this.navMenuData$ = this.store$.select(GlobalStoreSelectors.selectNavMenuTree);
      this.paimentCurrency$ = this.gss.userPaimentCurrency;
      this.shippingCountry$ = this.gss.userShippingCountry;
      this.language$ = this.store$.select(selectLanguage);
      this.initials$ = this.store$.select(UserStoreSelectors.selectUser).pipe(
        map(profile => profile ? profile.first_name[0].concat(profile.last_name[0]) : '?' ));
      this.rootCategories$ = this.store$.select(GlobalStoreSelectors.selectRootCategories);
  }

  logOut(): void {
    this.store$.dispatch(LogoutAction());
  }
  openShippingCoutryDialog() {
    this.dms.openShippingCountrySelectorDialog();
  }
  openPaimentCurrencyDialog(){
    this.dms.openPaymentCurrencySelectorDialog();
  }
  getHref(localId: string) {
    return '/'+localId;
  }
}
