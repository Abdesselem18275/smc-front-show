import { Component, OnInit } from '@angular/core';
import { AccountFormService } from '../../shared/service/account-form.service';
import { FormGroup } from '@angular/forms';
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
  onSubmit() {
    this.createForm.enable()
    if(this.createForm.valid) {
      const payload = this.createForm.value;
      this.store$.dispatch(UserStoreActions.CreateUserAction({
        payload}));
      this.serverError$ = this.store$.select(UserStoreSelectors.selectError);
    }
  }

}
