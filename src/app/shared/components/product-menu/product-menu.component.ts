import { Component, Output, EventEmitter } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/account.models';
import { Country, Currency, UserLanguage } from 'src/app/models/shared.models';
import { GlobalStateService } from '../../state/global-state.service';
import { DialogManagerService } from '../../services/dialog-manager.service';
import { AccountStateService } from 'src/app/shared/state/account-state.service';

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
  languageList: UserLanguage[];
  shippingCountry$: Observable<Country>;
  paimentCurrency$: Observable<Currency>;
  constructor( private router: Router,
                private ass : AccountStateService,
                private dms: DialogManagerService,
               private gss: GlobalStateService) {
                this.paimentCurrency$ = this.gss.userPaimentCurrency;
                this.shippingCountry$ = this.gss.userShippingCountry;
                this.profile$ = this.ass.authProfile
                this.isHomeRoute$ = this.router.events.pipe(
                  filter((x: any) => x instanceof NavigationEnd),
                  map(event => event.url === '/miscellaneous/home'));

  }
  toggleSideNav() {
    //this.dms.toggleSideNav();
    this.sideNavEmmiter.emit('');
  }
  openCardDialog() {
    this.dms.openCardDialog();

  }
  openSearchDialog() {
    this.dms.openSearchDialog();

  }
  openShippingCoutryDialog() {
    this.dms.openShippingCountrySelectorDialog();
  }
  openPaimentCurrencyDialog(){
    this.dms.openPaymentCurrencySelectorDialog();
  }
}
