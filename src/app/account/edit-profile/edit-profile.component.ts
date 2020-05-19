import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountFormService } from '../service/account-form.service';
import { SmcAuthService } from '../service/smc-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { ParamStoreState, RootStoreState } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { UserStoreActions, UserStoreSelectors } from 'src/app/root-store/user-store';
import { Profile } from '../model';
import { filter } from 'rxjs/operators';
import { countries } from 'src/utils/countries-list';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy  {
  accountForm: FormGroup;
  countryNames: any[];
  isUpdating$: Observable<boolean>;
  serverError$: Observable<any>;
  subscription: Subscription ;
  constructor(
              private store$: Store<RootStoreState.State>,
              private accountFormService: AccountFormService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.isUpdating$ = this.store$.select(UserStoreSelectors.selectIsLoading);
    this.accountForm = this.accountFormService.createLoadFullAccountForm();
    this.countryNames = countries();
    this.subscription = this.store$.select(UserStoreSelectors.selectUser).pipe(
      filter(profile => profile !== null)
    ).subscribe((profile: Profile) => {
      console.warn(profile);
      this.accountForm.setValue({
        first_name: profile.first_name,
        last_name: profile.last_name,
        gender: profile.gender,
        email : profile.email,
        company_name : profile.company_name,
        is_professional : profile.is_professional,
        position: profile.position,
        activity_field: profile.activity_field,
        phone_number : profile.phone_number,
        country : profile.country
      });
    });
  }

  onSubmit() {
    if (!this.accountForm.get('is_professional').value) {
      this.accountForm.setValue({
        company_name : null,
        position: null,
        activity_field: null,
      });
    }
    const payload = this.accountForm.value;
    this.store$.dispatch(UserStoreActions.UpdateUserAction({payload}));
    this.serverError$ = this.store$.select(UserStoreSelectors.selectError);
  }

}
