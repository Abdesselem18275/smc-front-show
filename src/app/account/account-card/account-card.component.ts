import { Component, OnInit } from '@angular/core';
import { UserAccount } from '../model';
import { Router } from '@angular/router';
import { ModalHandlerService } from 'src/app/shared/service/modal-handler.service';
import { SmcAuthService } from '../service/smc-auth.service';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit {
  account: UserAccount;
  constructor(private router: Router,
              private modalHandler: ModalHandlerService,
              private authService: SmcAuthService) { }

  ngOnInit() {
    this.account = this.authService.account;
  }

  logOut() {
    this.authService.logout();
    this.modalHandler.closeAll();
    this.router.navigate(['product/list']);
  }

}
