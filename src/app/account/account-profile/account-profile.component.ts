import { Component, OnInit } from '@angular/core';
import { UserAccount } from '../model';
import { SmcAuthService } from '../service/smc-auth.service';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent implements OnInit {

  myProfile: UserAccount;
  tabs: any[];
  constructor() { }

  ngOnInit() {
    this.tabs = [
      { label: 'Informations', icon: 'account_circle' },
      { label: 'Favorites', icon: 'favorite' },
      { label: 'Messages', icon: 'message' }
    ];
  }

}
