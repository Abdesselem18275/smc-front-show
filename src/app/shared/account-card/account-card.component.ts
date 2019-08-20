import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/account/service/auth.service';
import { UserAccount } from 'src/app/account/model';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit {
  currentAccount: UserAccount;
  isLogged: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.currentAccount = this.authService.isLogged() ?  this.authService.account : null;
    this.isLogged = this.authService.isLogged();
  }

}
