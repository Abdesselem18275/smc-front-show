import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountFormService } from '../service/account-form.service';
import { SmcAuthService } from '../service/smc-auth.service';
import { Store } from '@ngrx/store';
import { ParamStoreState, ModalStoreActions } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { UserStoreActions, UserStoreSelectors } from 'src/app/root-store/user-store';


interface CustomClasses {
  classes: string | string[];
  actionClasses: string | string[];
  dismissClasses: string | string[];
}

declare const gapi: any;

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.scss']
})
export class AccountLoginComponent implements OnInit   {
  email: string;
  account: string;
  auth_non_field_error: Observable<string>;
  fieldError:  string;
  createForm: FormGroup;
  loginForm: FormGroup;
  countryNames: any;
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


  close() {
    this.store$.dispatch(ModalStoreActions.CloseAllAction());
  }
  getEmailErrorMessage() {
    return this.loginForm.get('email').hasError('required') ? 'You must enter a value' :
        this.loginForm.get('email').hasError('email') ? 'Not a valid email' :
            '';
  }

  toggleModal(value) {
    this.store$.dispatch(ModalStoreActions.ToggleAction({key: value}));
  }

}
