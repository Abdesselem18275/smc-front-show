import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserStoreActions, UserStoreSelectors } from 'src/app/root-store/user-store';
import { AccountFormService } from '../../service/account-form.service';


declare const gapi: any;

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.scss']
})
export class AccountLoginComponent implements OnInit   {
  authNonFieldError: Observable<string>;
  loginForm: FormGroup;
  isChecking: Observable<boolean>;
  constructor(
              private accountFormService: AccountFormService,
              private store$: Store<any>) {
  }
   ngOnInit() {
    this.isChecking = this.store$.select(UserStoreSelectors.selectIsLoading);
    this.loginForm = this.accountFormService.createAuthForm();
  }

  onSubmit() {
    this.loginForm.enable();
    if(this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.store$.dispatch(UserStoreActions.LoginAction({credentials}));
      this.authNonFieldError = this.store$.select(UserStoreSelectors.selectError);
    }

  }
}
