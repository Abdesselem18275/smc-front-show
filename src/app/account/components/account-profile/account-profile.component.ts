import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/account.models';
import { AccountStateService } from 'src/app/shared/state/account-state.service';
import { GlobalStateService } from 'src/app/shared/state/global-state.service';

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
  constructor(private gss: GlobalStateService, private ass : AccountStateService) {
    this.profile$ = this.ass.authProfile
    this.isUpdating$ = this.gss.isLoading
  }


}
