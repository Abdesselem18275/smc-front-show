import { Component, OnInit } from '@angular/core';
import { AccountFormService } from '../service/account-form.service';
import { FormGroup } from '@angular/forms';
import { SmcAuthService } from '../service/smc-auth.service';
import { Store } from '@ngrx/store';
import { ParamStoreState , ModalStoreActions } from 'src/app/root-store';
import { UserStoreActions, UserStoreSelectors } from 'src/app/root-store/user-store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {
  createForm: FormGroup;
  countryNames: any;
  isChecking$: Observable<boolean>;
  serverError$: Observable<string>;



  constructor(
              private store$: Store<ParamStoreState.State>,
              private accountFormService: AccountFormService,
    ) { }

  ngOnInit() {
    this.isChecking$ = this.store$.select(UserStoreSelectors.selectIsLoading);
    this.createForm = this.accountFormService.createAccountForm();
  }


  cancel() {
    this.store$.dispatch(ModalStoreActions.CloseAllAction());
  }

  createProfile() {
    const payload = this.createForm.value;
    this.store$.dispatch(UserStoreActions.CreateUserAction({payload}));
    this.serverError$ = this.store$.select(UserStoreSelectors.selectError);
  }

  getEmailErrorMessage() {
    return this.createForm.get('email').hasError('required') ? 'You must enter a value' :
        this.createForm.get('email').hasError('email') ? 'Not a valid email' :
            '';
  }
  getPasswordErrorMessage(controlName: string) {
    return this.createForm.get(controlName).hasError('required') ? 'You must enter a value' :
        this.createForm.hasError('passwordNotConfirmed') ? 'Password must be equals' :
            '';
  }

}
