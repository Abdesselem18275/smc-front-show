import { Component, OnInit } from '@angular/core';
import { Profile } from '../../models/account.models';
import { ModalStoreSelectors } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { UserStoreActions, UserStoreSelectors } from 'src/app/root-store/user-store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ToggleAction } from 'src/app/root-store/modal-store/actions';

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
  initials$ : Observable<string>
  constructor(private router: Router,private store$: Store<any>) {
    this.profile$ = this.store$.select(UserStoreSelectors.selectUser);
    this.isSideNav$ = this.store$.select(ModalStoreSelectors.selectModalStateByType,{key : 'sideMenuBox'})
    this.isLogged$ = this.store$.select(UserStoreSelectors.selectIsAuthentificated);
    this.isLoading$ = this.store$.select(UserStoreSelectors.selectIsLoading);
    this.initials$ = this.store$.select(UserStoreSelectors.selectUser).pipe(map(profile => profile && profile.first_name[0].concat(profile.last_name[0]) ))
  }

  ngOnInit() {

  }

  logOut() {
    this.store$.dispatch(UserStoreActions.LogoutAction());
  }
  navToProfile() {
    const redirect = '/account/profile'
    this.router.navigateByUrl(redirect);
  }
  login(): void {
    this.store$.dispatch(ToggleAction({key: 'loginBox'}));
  }
}
