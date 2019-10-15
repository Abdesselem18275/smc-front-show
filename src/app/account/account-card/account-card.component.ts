import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { UserAccount } from '../model';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit {
  account: UserAccount;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.account = this.authService.account;
  }

}
