import { Component, OnInit } from '@angular/core';
 
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Profile } from 'src/app/models/account.models';
import { AccountStateService } from 'src/app/shared/state/account-state.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent {
  profile$: Observable<Profile>;
  isSideNav$: Observable<boolean>;
  isLogged: boolean;
  initials$: Observable<string>;
  constructor(private as : AuthService, private matDialog: MatDialog,private router: Router,private ass : AccountStateService) {
    this.profile$ = this.ass.authProfile
    this.isLogged = this.as.isLogged
    this.initials$ = this.profile$.pipe(map(profile => profile.initials))
  }

  logOut() {
    this.as.logout()
  }
  navToProfile() {
    const redirect = '/account/profile';
    this.router.navigateByUrl(redirect);
  }

}
