import { Component, OnInit } from '@angular/core';
import { UserAccount } from '../model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent implements OnInit {

  myProfile: any;
  tabs: any[];
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.myProfile = this.authService.account;
    this.tabs = [
      { label: 'Informations', icon: 'account_circle' },
      { label: 'Favorites', icon: 'favorite' },
      { label: 'Icon', icon: 'message' }
    ];
  }

}
