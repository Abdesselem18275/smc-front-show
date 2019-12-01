import { Component, OnInit } from '@angular/core';
import { AccountFormService } from '../service/account-form.service';
import { FormGroup } from '@angular/forms';
import { SmcAuthService } from '../service/smc-auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { ParamStoreState , ModalStoreActions } from 'src/app/root-store';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {
  createForm: FormGroup;
  countryNames: any;
  isChecking: boolean;
  serverError: any;



  constructor(
              private authService: SmcAuthService,
              private store$: Store<ParamStoreState.State>,
              private accountFormService: AccountFormService,
    ) { }

  ngOnInit() {
    this.isChecking = false;
    this.createForm = this.accountFormService.createShortAccountForm();
    this.countryNames = this.authService.countries;

  }


  cancel() {
    this.store$.dispatch(ModalStoreActions.CloseAllAction);
  }

  createProfile() {
    this.isChecking = true;
    const jsonData = JSON.stringify(this.createForm.value);

    this.authService.createAccount(jsonData).subscribe(x => {
      const cred = JSON.stringify({
        email : this.createForm.get('profile.email').value,
        password : this.createForm.get('profile.password').value
      });
      this.authService.login(cred).subscribe(() => {
        this.authService.redirect();
        this.isChecking = false;
        });
    },
    error => {
      this.isChecking = false;
      if (error instanceof HttpErrorResponse) {
        this.serverError = this.accountFormService.flatten(error.error) || '';
        }
    });
  }

  getEmailErrorMessage() {
    return this.createForm.get('profile.email').hasError('required') ? 'You must enter a value' :
        this.createForm.get('profile.email').hasError('email') ? 'Not a valid email' :
            '';
  }
  getPasswordErrorMessage(controlName: string) {
    return this.createForm.get('profile.' + controlName).hasError('required') ? 'You must enter a value' :
        this.createForm.hasError('passwordNotConfirmed') ? 'Password must be equals' :
            '';
  }

}
