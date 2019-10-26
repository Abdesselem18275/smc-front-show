import { Component, OnInit } from '@angular/core';
import { UserAccount } from '../model';
import { Router } from '@angular/router';
import { ModalHandlerService } from 'src/app/shared/service/modal-handler.service';
import { SmcAuthService } from '../service/smc-auth.service';
import { AccountCacheService } from '../service/account-cache.service';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit {
  account: UserAccount;
  constructor(private router: Router,
              private modalHandler: ModalHandlerService,
              private authService: SmcAuthService,
              private accountCache: AccountCacheService) { }

  ngOnInit() {
    this.account = this.accountCache.account;
  }

  logOut() {
    this.authService.logout();
    this.modalHandler.closeAll();
    this.router.navigate(['product/list']);
  }

}
