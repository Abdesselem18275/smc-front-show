import { Injectable } from '@angular/core';
import { ValidationErrors , FormGroup, FormBuilder, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { RootStoreConfig, Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { UserStoreSelectors, UserStoreActions } from 'src/app/root-store/user-store';
import { Profile } from '../model';

@Injectable({
  providedIn: 'root'
})
export class AccountFormService {
  constructor(private fb: FormBuilder) {
   }

  createShortAccountForm(): FormGroup {
    const  form = this.fb.group({
        email : ['', [Validators.email, Validators.required]],
        password : ['', Validators.required],
        confirmPassword : ['', Validators.required],
        first_name : ['', Validators.required],
        last_name : ['', Validators.required],
        gender : ['M', Validators.required],

    } , { validators: this.passwordConfirmedValidator });
    return form;
  }

  createAccountForm(): FormGroup {
    const  form = this.fb.group({
        email : ['', [Validators.email, Validators.required]],
        password : ['', Validators.required],
        confirmPassword : ['', Validators.required],
        first_name : ['', Validators.required],
        last_name : ['', Validators.required],
        country : ['', Validators.required],
        is_professional : [false]
    } , { validators: this.passwordConfirmedValidator });
    return form;
  }

  createAuthForm(): FormGroup {
    const   form = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required],
    });
    return form;
  }

  createLoadFullAccountForm() {
    const myForm  = this.createShortAccountForm();
    myForm.addControl('company_name', new FormControl());
    myForm.addControl('position', new FormControl());
    myForm.addControl('activity_field', new FormControl());
    myForm.addControl('phone_number', new FormControl());
    myForm.addControl('country', new FormControl());
    myForm.addControl('is_professional', new FormControl());
    myForm.removeControl('password');
    myForm.removeControl('confirmPassword');
    return myForm;
  }

  passwordConfirmedValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value === confirmPassword.value)  {
      return null;
    }
    if (control.get('confirmPassword')) {
      control.get('confirmPassword').setErrors({'passwordNotConfirmed': true});
    }
    return { 'passwordNotConfirmed': true } ;
  }
}
