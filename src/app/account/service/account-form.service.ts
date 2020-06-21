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


  createAccountForm(): FormGroup {
    const  form = this.fb.group({
        email : ['', [Validators.email, Validators.required]],
        password : ['', Validators.required],
        confirmPassword : ['', Validators.required],
        firstName : ['', Validators.required],
        lastName : ['', Validators.required],
        civility : ['Mr', Validators.required],
        isProfessional : [false]
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
    const myForm  = this.createAccountForm();
    myForm.addControl('companyName', new FormControl());
    myForm.addControl('position', new FormControl());
    myForm.addControl('activityField', new FormControl());
    myForm.addControl('phoneNumber', new FormControl());
    myForm.addControl('country', new FormControl());
    myForm.removeControl('password');
    myForm.removeControl('confirmPassword');
    return myForm;
  }

  createUserRequestForm() {
    const   form = this.fb.group({
      subjects : ['', Validators.required],
      related_products : ['', Validators.required],
      text_content : [''],
    });
    return form;
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
