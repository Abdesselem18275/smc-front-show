import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/account.models';
import { RootStoreState } from 'src/app/root-store';
import { UserStoreActions, UserStoreSelectors } from 'src/app/root-store/user-store';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent  {
  tabs = [
    { label: 'Informations', icon: 'account_circle' , path: 'profile' },
    { label: 'Favorites', icon: 'favorite' , path: 'favorites' },
    { label: 'Messages', icon: 'message', path: 'messages' }
  ];
  activeLink=this.tabs[0].label;
  isUpdating$: Observable<boolean>;
  profile$: Observable<Profile>;
  constructor(private store$: Store<RootStoreState.State>) {
    this.profile$ = this.store$.select(UserStoreSelectors.selectUser);
    this.isUpdating$ = this.store$.select(UserStoreSelectors.selectIsLoading);
  }


}
