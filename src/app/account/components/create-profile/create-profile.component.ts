import { Component} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserStoreActions, UserStoreSelectors } from 'src/app/root-store/user-store';
import { Observable } from 'rxjs';
import { countries } from 'src/utils/countries-list';
import { AccountFormService } from '../../service/account-form.service';
import { GlobalStateService } from 'src/app/shared/state/global-state.service';
import { Country } from 'src/app/models/shared.models';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent  {
  createForm: FormGroup;
  isChecking$: Observable<boolean>;
  serverError$: Observable<string>;
  countries$: Observable<Country[]>;


  constructor(
              private gss: GlobalStateService,
              private store$: Store<any>,
              private accountFormService: AccountFormService,
    ) {
      this.isChecking$ = this.store$.select(UserStoreSelectors.selectIsLoading);
      this.createForm = this.accountFormService.createAccountForm();
      this.serverError$ = this.store$.select(UserStoreSelectors.selectError);
      this.countries$ = this.gss.countries;
     }
  onSubmit(): void {
    this.createForm.enable();
    if(this.createForm.valid) {
      this.store$.dispatch(UserStoreActions.CreateUserAction({
        payload : this.createForm.value}));
    }
  }

}
