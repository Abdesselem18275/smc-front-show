import { Component, OnInit } from '@angular/core';
import { Profile } from '../model';
import { ModalStoreActions, ParamStoreState, ModalStoreSelectors } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { UserStoreActions, UserStoreSelectors } from 'src/app/root-store/user-store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit {
  profile$: Observable<Profile>;
  isSideNav$: Observable<boolean>;
  isLogged$:Observable<boolean>;
  isLoading$: Observable<boolean>;
  constructor(private router: Router,private store$: Store<ParamStoreState.State>) { }

  ngOnInit() {
    this.profile$ = this.store$.select(UserStoreSelectors.selectUser);
    this.isSideNav$ = this.store$.select(ModalStoreSelectors.selectModalStateByType,{key : 'sideMenuBox'})
    this.isLogged$ = this.store$.select(UserStoreSelectors.selectIsAuthentificated);
    this.isLoading$ = this.store$.select(UserStoreSelectors.selectIsLoading);
  }

  logOut() {
    this.store$.dispatch(UserStoreActions.LogoutAction());
  }
  navToProfile() {
    const redirect = '/account/profile'
    this.router.navigateByUrl(redirect);
  }

}
