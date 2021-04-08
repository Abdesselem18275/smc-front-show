import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
 
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AccountStateService } from 'src/app/shared/state/account-state.service';
import { GlobalStateService } from 'src/app/shared/state/global-state.service';
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
              private ass : AccountStateService,
              private gss :GlobalStateService,
              private accountFormService: AccountFormService) {
  }
   ngOnInit() {
    this.isChecking = this.gss.isLoading
    this.loginForm = this.accountFormService.createAuthForm();
  }

  onSubmit() {
    this.loginForm.enable();
    if(this.loginForm.valid) {
      this.ass.login(this.loginForm.value).pipe(
        first()
      ).subscribe(() => alert("Authenticated"))
    }

  }
}
