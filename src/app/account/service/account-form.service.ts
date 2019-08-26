import { Injectable } from '@angular/core';
import { ValidationErrors , FormGroup, FormBuilder, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountFormService {

  constructor(private fb: FormBuilder , private authService: AuthService) { }

  createAccountForm(): FormGroup {
    const  form = this.fb.group({
      profile : this.fb.group({
        email : ['', [
          Validators.email, Validators.required]
        ],
        password : ['', Validators.required],
        confirmPassword : ['', Validators.required],
        first_name : ['', Validators.required],
        last_name : ['', Validators.required],
      }),
      country : [null, Validators.required],
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
    let myForm  = this.createAccountForm();
    const account = this.authService.account;
    myForm.addControl('company_name', new FormControl(account.company_name));
    myForm.addControl('position', new FormControl(account.position));
    myForm.addControl('activity', new FormControl(account.activity_field));
    myForm.addControl('phoneNumber', new FormControl(account.phone_number));
    myForm.setControl('country', new FormControl(account.country));
    myForm.setControl('is_professional', new FormControl(account.is_professional));
    const profile = this.fb.group({
      password : [''],
      confirmPassword : [''],
      first_name : [account.profile.first_name, Validators.required],
      last_name : [account.profile.last_name, Validators.required],
    });
    myForm.setControl('profile', profile);

    return myForm;
  }

  passwordConfirmedValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('profile.password');
    const confirmPassword = control.get('profile.confirmPassword');
    if (password && confirmPassword && password.value === confirmPassword.value)  {
      return null;
    }
    if (control.get('profile.confirmPassword')) {
      control.get('profile.confirmPassword').setErrors({'passwordNotConfirmed': true});
    }
    return { 'passwordNotConfirmed': true } ;
  }

  editFormReplacer(key, value) {
    // Filtering out properties
    if ( key === 'email') {
      return undefined;
    }
    if ( key === 'password' && value === '') {
      return undefined;
    }
    if ( key === 'confirmPassword') {
      return undefined;
    }
    return value;
  }
}
