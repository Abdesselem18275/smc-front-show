import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { AccountFormService } from '../service/account-form.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.scss']
})
export class AccountLoginComponent implements OnInit {

  email: string;
  account: string;
  auth_non_field_error: any;
  creation_non_field_error: any;
  fieldError:  string;
  createForm: FormGroup;
  loginForm: FormGroup;
  countryNames: any;



  constructor(public router: Router, private authService: AuthService,
              private accountFormService: AccountFormService) {

   }

   ngOnInit() {
    this.createForm = this.accountFormService.createAccountForm();
    this.loginForm = this.accountFormService.createAuthForm();
    this.countryNames = this.authService.countries;
  }


  onSubmit() {
    const credentials = this.loginForm.value;
    this.authService.login(JSON.stringify(credentials)).subscribe(() => {
      if (this.authService.isLogged()) {
        const redirect = this.authService.redirectUrl ?
        this.router.parseUrl(this.authService.redirectUrl) : '/account/profile';
        this.router.navigateByUrl(redirect);
      }
    },
    error => {
      console.warn(error);
      this.auth_non_field_error  = error.error['non_field_errors'] || '';
    });
  }

  createProfile() {
    console.warn(JSON.stringify(this.createForm.value));
    this.authService.createAccount(JSON.stringify(this.createForm.value)).subscribe(x => {
    },
    error => {
      if (error instanceof HttpErrorResponse) {
        this.creation_non_field_error  = error.error['non_field_errors'] || '';
        this.fieldError = error.error || '';
        console.warn(error.error);
        const email_error = error.error['profile']['email'] || '';
        if (email_error !== '') {
          this.createForm.get('profile.email').setErrors({'incorrect': true});
        }
      }
    });
  }
}