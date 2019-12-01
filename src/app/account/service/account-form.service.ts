import { Injectable } from '@angular/core';
import { ValidationErrors , FormGroup, FormBuilder, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { AccountCacheService } from './account-cache.service';

@Injectable({
  providedIn: 'root'
})
export class AccountFormService {

  constructor(private fb: FormBuilder , private  accountCache: AccountCacheService) { }

  createShortAccountForm(): FormGroup {
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

    } , { validators: this.passwordConfirmedValidator });
    return form;

  }

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
    const myForm  = this.createAccountForm();
    const account = this.accountCache.account;
    console.warn(account);
    myForm.addControl('company_name', new FormControl({value: account.company_name , disabled: !account.is_professional}));
    myForm.addControl('position', new FormControl({value: account.position , disabled: !account.is_professional}));
    myForm.addControl('activity_field', new FormControl({value: account.activity_field , disabled: !account.is_professional}));
    myForm.addControl('phone_number', new FormControl(account.phone_number));
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

  flatten(object, prefix = '')  {
    return Object.keys(object).reduce((carry, key) => {
        const pre = prefix ? prefix + `[${key}]` : '';

        if (Array.isArray(object[key])) {
            carry = object[key].reduce((array, value, index) => {
                array[(pre || key) + `[${index}]`] = value;
                return array;
            }, carry);
        } else if (object[key] && typeof object[key] === 'object') {
            Object.assign(carry, this.flatten(object[key], pre || key));
        } else {
            carry[pre || key] = object[key];
        }

        return carry;
    }, {});
};
}
