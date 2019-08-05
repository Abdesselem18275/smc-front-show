import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { UserAccount } from '../model';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent implements OnInit {

  myProfile: UserAccount;
  tabs: any[];
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.myProfile = this.authService.account;
    console.warn(this.myProfile);
    this.tabs = [
      { label: 'Informations', icon: 'account_circle' },
      { label: 'Favorites', icon: 'favorite' },
      { label: 'Icon', icon: 'message' }
    ];
  }

}
