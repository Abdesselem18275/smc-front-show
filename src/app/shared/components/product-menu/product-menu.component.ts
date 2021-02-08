import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { filter, map, take } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AccountCardComponent } from '../account-card/account-card.component';
import { UserStoreActions, UserStoreSelectors } from 'src/app/root-store/user-store';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { UserLanguage } from 'src/app/root-store/global-store/state';
import { SUPPORTED_LANGUAGES } from 'src/app/injectables';
import { selectLanguage } from 'src/app/root-store/global-store/selectors';
import { Profile } from 'src/app/models/account.models';
import { SideNavMenuComponent } from '../side-nav-menu/side-nav-menu.component';
import { Country, Currency } from 'src/app/models/shared.models';
import { GlobalStateService } from '../../state/global-state.service';
import { LocalesDialogComponent } from '../locales-dialog/locales-dialog.component';
import { AuthentificationDialogComponent } from 'src/app/account/components/authentification-dialog/authentification-dialog.component';
import { LazyLoaderService } from '../../services/lazy-loader.service';

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
              private lls: LazyLoaderService,
               private gss: GlobalStateService,
               private dialog: MatDialog,
               @Inject(SUPPORTED_LANGUAGES) languageList: UserLanguage[],
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
    this.dialog.open(SideNavMenuComponent,{
      position: {top:'0',right:'0'},
      width:'100vw',
      maxWidth:'100vw'
    });
  }
  openCardDialog() {
    this.lls.loadModule(
      () => import('../../../account/account.module').then(m => m.AccountModule)).then(() => this.profile$.pipe(take(1)).subscribe((x) => {
        if(x) {
         this.dialog.open(AccountCardComponent,{
           position: {top:'5rem',right:'1rem'},
           width:'20rem'
         });
        }else {
         this.dialog.open(AuthentificationDialogComponent,{
           width:'400px',
           maxWidth:'100vw'
         });
        }
     }));


  }
  openSearchDialog() {
    this.dialog.open(SearchBoxComponent,{
      position: {top:'0',right:'0'},
      width:'100vw',
      maxWidth:'100vw',
      hasBackdrop:false,
    });

  }
  openLocalDialog(){
    this.dialog.open(LocalesDialogComponent,{
      width:'800px',
      maxWidth:'100vw',
      });
  }

}
