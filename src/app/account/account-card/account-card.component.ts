import { Component, OnInit } from '@angular/core';
import { Profile } from '../model';
import { ModalStoreActions, ParamStoreState } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { UserStoreActions, UserStoreSelectors } from 'src/app/root-store/user-store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit {
  profile$: Observable<Profile>;
  constructor(private store$: Store<ParamStoreState.State>) { }

  ngOnInit() {
    this.store$.dispatch(UserStoreActions.UserRefreshAction());
    this.profile$ = this.store$.select(UserStoreSelectors.selectUser);
  }

  logOut() {
    this.store$.dispatch(UserStoreActions.LogoutAction());
    this.store$.dispatch(ModalStoreActions.CloseAllAction());
  }

}
