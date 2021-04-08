import { Component, Inject} from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/account.models';
import { Category } from 'src/app/models/product.models';
import { GlobalStateService } from '../../state/global-state.service';
import { Country, Currency, UserLanguage } from 'src/app/models/shared.models';
import { DialogManagerService } from '../../services/dialog-manager.service';
import { map } from 'rxjs/operators';
import { SUPPORTED_LANGUAGES } from 'src/app/injectables';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AccountStateService } from 'src/app/shared/state/account-state.service';


@Component({
  selector: 'app-side-nav-menu',
  templateUrl: './side-nav-menu.component.html',
  styleUrls: ['./side-nav-menu.component.scss']
})
export class SideNavMenuComponent {
  profile$: Observable<Profile>;
  isLogged: boolean;
  rootCategories$: Observable<Category[]>;
  paimentCurrency$: Observable<Currency>;
  shippingCountry$: Observable<Country>;
  language$: Observable<UserLanguage | null>;
  initials$: Observable<string>;
  languageList: UserLanguage[];
  constructor(
    private as : AuthService,
    private dms: DialogManagerService,
    private ass : AccountStateService,
    private gss: GlobalStateService,
    @Inject(SUPPORTED_LANGUAGES) languageList: UserLanguage[]) {
      this.languageList = languageList;
      this.profile$ = this.ass.authProfile
      this.isLogged = this.as.isLogged
      this.paimentCurrency$ = this.gss.userPaimentCurrency;
      this.shippingCountry$ = this.gss.userShippingCountry;
      this.language$ = this.gss.selectedLanguage
      this.initials$ = this.profile$.pipe(
        map(profile => profile ? profile.firstName[0].concat(profile.lastName[0]) : '?' ));
      this.rootCategories$ = this.gss.categories.pipe(map(categories => categories.filter(cat => cat.isRoot)))
  }

  logOut(): void {
    this.as.logout()
  }
  openShippingCoutryDialog() {
    this.dms.openShippingCountrySelectorDialog();
  }
  openPaimentCurrencyDialog(){
    this.dms.openPaymentCurrencySelectorDialog();
  }
    openCardDialog() {
    this.dms.openCardDialog();

  }
  getHref(localId: string) {
    return '/'+localId;
  }
}
