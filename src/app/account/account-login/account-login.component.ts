import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountFormService } from '../service/account-form.service';
import { SmcAuthService } from '../service/smc-auth.service';
import { Store } from '@ngrx/store';
import { ParamStoreState, ModalStoreActions } from 'src/app/root-store';


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
  auth_non_field_error: any;
  creation_non_field_error: any;
  fieldError:  string;
  createForm: FormGroup;
  loginForm: FormGroup;
  countryNames: any;
  isChecking: boolean;
  constructor(
              private authService: SmcAuthService,
              private accountFormService: AccountFormService,
              private store$: Store<ParamStoreState.State>) {
  }
   ngOnInit() {
    this.isChecking = false;
    this.createForm = this.accountFormService.createShortAccountForm();
    this.loginForm = this.accountFormService.createAuthForm();
    this.countryNames = this.authService.countries;
  }

  onSubmit() {
    this.isChecking = true;
    const credentials = this.loginForm.value;
    this.auth_non_field_error = '';
    if (this.loginForm.valid) {
      this.authService.login(JSON.stringify(credentials)).subscribe(() => {
      this.authService.redirect();
      this.isChecking = false;
      },
      error => {
        this.isChecking = false;
        this.auth_non_field_error  = JSON.parse(JSON.stringify(error.error));
        console.warn(this.auth_non_field_error);
      });
    }
  }


  cancel() {
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
