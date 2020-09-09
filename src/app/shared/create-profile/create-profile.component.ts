import { Component, OnInit } from '@angular/core';
import { AccountFormService } from '../../shared/service/account-form.service';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ParamStoreState  } from 'src/app/root-store';
import { UserStoreActions, UserStoreSelectors } from 'src/app/root-store/user-store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {
  createForm: FormGroup;
  isChecking$: Observable<boolean>;
  serverError$: Observable<string>;



  constructor(
              private store$: Store<ParamStoreState.State>,
              private accountFormService: AccountFormService,
    ) { }

  ngOnInit():void {
    this.isChecking$ = this.store$.select(UserStoreSelectors.selectIsLoading);
    this.createForm = this.accountFormService.createAccountForm();
  }
  onSubmit():void {
    this.createForm.enable()
    if(this.createForm.valid) {
      this.store$.dispatch(UserStoreActions.CreateUserAction({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        payload : this.createForm.value}));
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.serverError$ = this.store$.select(UserStoreSelectors.selectError);
    }
  }

}
