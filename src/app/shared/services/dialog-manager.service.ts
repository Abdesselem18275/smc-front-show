import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AccountCardComponent } from 'src/app/account/components/account-card/account-card.component';
import { AuthentificationDialogComponent } from 'src/app/account/components/authentification-dialog/authentification-dialog.component';
import { RootStoreState } from 'src/app/root-store';
import { UserStoreSelectors } from 'src/app/root-store/user-store';
import { CurrencySelectorDialogComponent } from '../components/currency-selector-dialog/currency-selector-dialog.component';
import { SearchBoxComponent } from '../components/search-box/search-box.component';
import { ShippingCountrySelectorDialogComponent }
  from '../components/shipping-country-selector-dialog/shipping-country-selector-dialog.component';
import { SideNavMenuComponent } from '../components/side-nav-menu/side-nav-menu.component';
import { LazyLoaderService } from './lazy-loader.service';

@Injectable({
  providedIn: 'root'
})
export class DialogManagerService {

  constructor(
    private store$: Store<RootStoreState.State>,
    private lls: LazyLoaderService ,
    private dialog: MatDialog) { }


  openCardDialog() {
    this.lls.loadModule(
      () => import('../../account/account.module').then(m => m.AccountModule)).then(() =>
        this.store$.select(UserStoreSelectors.selectUser).pipe(take(1)).subscribe((x) => {
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
  openPaymentCurrencySelectorDialog(){
    this.dialog.open(CurrencySelectorDialogComponent,{
      width:'800px',
      maxWidth:'100vw',
      });
  }
  openShippingCountrySelectorDialog() {
    this.dialog.open(ShippingCountrySelectorDialogComponent,{
      width:'800px',
      maxWidth:'100vw',
      });
  }
}
