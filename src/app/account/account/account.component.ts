import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  tabs: any[];
  activeLink:string;

  constructor() { }

  ngOnInit() {
    this.tabs = [
      { label: 'Informations', icon: 'account_circle' , path: 'profile' },
      { label: 'Favorites', icon: 'favorite' , path: 'favorites' },
      { label: 'Messages', icon: 'message', path: 'messages' }
    ];
    this.activeLink = this.tabs[0].label;
  }

}
