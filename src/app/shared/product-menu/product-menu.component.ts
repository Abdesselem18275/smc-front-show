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
import { LocalesDialogComponent } from '../components/locales-dialog/locales-dialog.component';

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
  language$: Observable<UserLanguage | null>;
  languageList: UserLanguage[];
  constructor( private router: Router,
               private dialog: MatDialog,
               @Inject(SUPPORTED_LANGUAGES) languageList: UserLanguage[],
               private store$: Store<RootStoreState.State>) {
                this.isHomeRoute$ = this.router.events.pipe(
                  filter((x: any) => x instanceof NavigationEnd),
                  map(event => event.url === '/miscellaneous/home'));
                  this.language$ = this.store$.select(selectLanguage);

  }
  toggleSideNav() {
    this.sideNavEmmiter.emit('');
  }
  openCardDialog() {
    this.dialog.open(AccountCardComponent,{
      position: {top:'5rem',right:'1rem'},
      width:'20rem'
    });
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
      width:'600px',
      maxWidth:'100vw',
      });
  }

}
