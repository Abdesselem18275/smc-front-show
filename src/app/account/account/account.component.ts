import { Component, OnInit } from '@angular/core';
import { RootStoreState } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserStoreSelectors, UserStoreActions } from 'src/app/root-store/user-store';
import { DomSanitizer } from '@angular/platform-browser';
import { Profile } from '../model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  tabs: any[];
  activeLink: string;
  isUpdating$: Observable<boolean>;
  profile$: Observable<Profile>;
  constructor(private store$: Store<RootStoreState.State>,) { }

  ngOnInit() {
    this.store$.dispatch(UserStoreActions.UserRefreshAction())
    this.profile$ = this.store$.select(UserStoreSelectors.selectUser)
    this.isUpdating$ = this.store$.select(UserStoreSelectors.selectIsLoading);
    this.tabs = [
      { label: 'Informations', icon: 'account_circle' , path: 'profile' },
      { label: 'Favorites', icon: 'favorite' , path: 'favorites' },
      { label: 'Messages', icon: 'message', path: 'messages' }
    ];
    this.activeLink = this.tabs[0].label;
  }

}
