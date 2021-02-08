import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { UserStoreSelectors } from 'src/app/root-store/user-store';
import { UserLanguage } from 'src/app/root-store/global-store/state';
import { selectLanguage } from 'src/app/root-store/global-store/selectors';
import { Profile } from 'src/app/models/account.models';
import { Country, Currency } from 'src/app/models/shared.models';
import { GlobalStateService } from '../../state/global-state.service';
import { LazyLoaderService } from '../../services/lazy-loader.service';
import { DialogManagerService } from '../../services/dialog-manager.service';

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.scss'],
})
export class ProductMenuComponent  {
  @Output()
  sideNavEmmiter = new EventEmitter<any>();
  @Output() isSideMenuActiveEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  isHomeRoute$: Observable<boolean>;
  profile$: Observable<Profile>;
  language$: Observable<UserLanguage | null>;
  languageList: UserLanguage[];
  shippingCountry$: Observable<Country>;
  paimentCurrency$: Observable<Currency>;
  constructor( private router: Router,
              private dms: DialogManagerService,
               private gss: GlobalStateService,
               private store$: Store<RootStoreState.State>) {
                this.paimentCurrency$ = this.gss.userPaimentCurrency;
                this.shippingCountry$ = this.gss.userShippingCountry;
                this.profile$ = this.store$.select(UserStoreSelectors.selectUser);
                this.isHomeRoute$ = this.router.events.pipe(
                  filter((x: any) => x instanceof NavigationEnd),
                  map(event => event.url === '/miscellaneous/home'));
                  this.language$ = this.store$.select(selectLanguage);

  }
  toggleSideNav() {
    this.dms.toggleSideNav();
  }
  openCardDialog() {
    this.dms.openCardDialog();

  }
  openSearchDialog() {
    this.dms.openSearchDialog();

  }
  openLocalDialog(){
    this.dms.openLocalDialog();
  }

}
