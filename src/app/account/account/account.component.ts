import { Component, OnInit } from '@angular/core';
import { RootStoreState } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserStoreSelectors, UserStoreActions } from 'src/app/root-store/user-store';
import { DomSanitizer } from '@angular/platform-browser';
import { Profile } from '../../models/account.models';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
