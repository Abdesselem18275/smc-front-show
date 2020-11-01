import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountFormService } from '../service/account-form.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserStoreActions, UserStoreSelectors } from 'src/app/root-store/user-store';
import { Profile } from '../../models/account.models';
import { filter } from 'rxjs/operators';
import { countries } from 'src/utils/countries-list';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy  {
  accountForm: FormGroup;
  countryNames= countries();
  isUpdating$: Observable<boolean>;
  serverError$: Observable<any>;
  subscription: Subscription ;
  constructor(private store$: Store,
              private accountFormService: AccountFormService)
              {
    this.accountForm = this.accountFormService.createLoadFullAccountForm();
    this.isUpdating$ = this.store$.select(UserStoreSelectors.selectIsLoading);
               }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit():void {


    this.subscription = this.store$.select(UserStoreSelectors.selectUser).pipe(
      filter(profile => profile !== null)
    ).subscribe((profile: Profile) => {
      this.accountForm.setValue({
        first_name: profile.first_name,
        last_name: profile.last_name,
        civility: profile.civility,
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

  onSubmit():void {
    if (!this.accountForm.get('is_professional').value) {
      this.accountForm.setValue({
        company_name : null,
        position: null,
        activity_field: null,
      });
    }
    const payload = this.accountForm.value;
    this.store$.dispatch(UserStoreActions.UpdateUserAction({
      message:'Your profile informations was successfully updated',
      payload}));
    this.serverError$ = this.store$.select(UserStoreSelectors.selectError);
  }

}
