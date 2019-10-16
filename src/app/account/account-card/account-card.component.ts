import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { UserAccount } from '../model';
import { Router } from '@angular/router';
import { ModalHandlerService } from 'src/app/shared/service/modal-handler.service';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit {
  account: UserAccount;
  constructor(private router: Router,
              private modalHandler: ModalHandlerService,
              private authService: AuthService) { }

  ngOnInit() {
    this.account = this.authService.account;
  }

  logOut() {
    this.authService.logout();
    this.modalHandler.closeAll();
    this.router.navigate(['product/list']);
  }

}
