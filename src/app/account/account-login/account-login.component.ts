import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SmcAuthService } from '../../account/service/smc-auth.service';
import { Store } from '@ngrx/store';
import { ParamStoreState, ModalStoreActions } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { UserStoreActions, UserStoreSelectors } from 'src/app/root-store/user-store';
import { AccountFormService } from 'src/app/account/service/account-form.service';


declare const gapi: any;

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.scss']
})
export class AccountLoginComponent implements OnInit   {
  auth_non_field_error: Observable<string>;
  loginForm: FormGroup;
  isChecking: Observable<boolean>;
  constructor(
              private accountFormService: AccountFormService,
              private store$: Store<ParamStoreState.State>) {
  }
   ngOnInit() {
    this.isChecking = this.store$.select(UserStoreSelectors.selectIsLoading);
    this.loginForm = this.accountFormService.createAuthForm();
  }

  onSubmit() {
    const credentials = this.loginForm.value;
    this.store$.dispatch(UserStoreActions.LoginAction({credentials}));
    this.auth_non_field_error = this.store$.select(UserStoreSelectors.selectError);
  }
}
