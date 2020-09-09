import { Component, OnInit } from '@angular/core';
import { RootStoreState } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Profile} from '../../models/account.models';
import { UserStoreActions, UserStoreSelectors } from 'src/app/root-store/user-store';

@Component({
  selector: 'app-user-request-list',
  templateUrl: './user-request-list.component.html',
  styleUrls: ['./user-request-list.component.scss']
})
export class UserRequestListComponent implements OnInit {
  userRequests$ : Observable<Profile>
  constructor(private store$: Store<RootStoreState.State>) { }

  ngOnInit(): void {
    this.store$.dispatch(UserStoreActions.FetchUserRequestsAction())
    this.userRequests$ = this.store$.select(UserStoreSelectors.selectUser)
  }

}
