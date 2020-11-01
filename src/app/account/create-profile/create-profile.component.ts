import { Component} from '@angular/core';
import { AccountFormService } from '../service/account-form.service';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserStoreActions, UserStoreSelectors } from 'src/app/root-store/user-store';
import { Observable } from 'rxjs';
import { countries } from 'src/utils/countries-list';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent  {
  createForm: FormGroup;
  isChecking$: Observable<boolean>;
  serverError$: Observable<string>;
  countryNames= countries();


  constructor(
              private store$: Store<any>,
              private accountFormService: AccountFormService,
    ) {
      this.isChecking$ = this.store$.select(UserStoreSelectors.selectIsLoading);
      this.createForm = this.accountFormService.createAccountForm();
      this.serverError$ = this.store$.select(UserStoreSelectors.selectError);
     }
  onSubmit():void {
    this.createForm.enable()
    if(this.createForm.valid) {
      this.store$.dispatch(UserStoreActions.CreateUserAction({
        payload : this.createForm.value}));
    }
  }

}
