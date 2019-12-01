import { Component, OnInit } from '@angular/core';
import { UserAccount } from '../model';
import { Router } from '@angular/router';
import { SmcAuthService } from '../service/smc-auth.service';
import { AccountCacheService } from '../service/account-cache.service';
import { ModalStoreActions, ParamStoreState } from 'src/app/root-store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit {
  account: UserAccount;
  constructor(private router: Router,
              private store$: Store<ParamStoreState.State>,
              private authService: SmcAuthService,
              private accountCache: AccountCacheService) { }

  ngOnInit() {
    this.account = this.accountCache.account;
  }

  logOut() {
    this.authService.logout();
    this.store$.dispatch(ModalStoreActions.CloseAllAction());
    this.router.navigate(['product/list']);
  }

}
