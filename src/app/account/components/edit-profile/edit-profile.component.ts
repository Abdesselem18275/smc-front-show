/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {  Observable, Subscription } from 'rxjs';
 
import { filter, first } from 'rxjs/operators';
import { countries } from 'src/utils/countries-list';
import { Profile } from 'src/app/models/account.models';
import { AccountFormService } from '../../service/account-form.service';
import { AccountStateService } from 'src/app/shared/state/account-state.service';
import { GlobalStateService } from 'src/app/shared/state/global-state.service';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy  {
  accountForm: FormGroup;
  countryNames= countries();
  isUpdating$: Observable<boolean>;
  serverError$!: Observable<any>;
  subscription!: Subscription ;
  constructor(private ass : AccountStateService,
              private gss : GlobalStateService,
              private accountFormService: AccountFormService)
              {
    this.accountForm = this.accountFormService.createLoadFullAccountForm();
    this.isUpdating$ = this.gss.isLoading
               }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {


    this.subscription = this.ass.authProfile.pipe(
      first(),
      filter(profile => profile !== null)
    ).subscribe((profile: Profile) => {
      this.accountForm.setValue({
        first_name: profile.firstName,
        last_name: profile.lastName,
        civility: profile.civility,
        email : profile.email,
        company_name : profile.companyName,
        is_professional : profile.isProfessional,
        position: profile.position,
        activity_field: profile.activityField,
        phone_number : profile.phoneNumber,
        country : profile.country
      });
    });
  }

  onSubmit(): void {
    if (!this.accountForm.get('is_professional')?.value) {
      this.accountForm.setValue({
        company_name : null,
        position: null,
        activity_field: null,
      });
    }
    const payload = this.accountForm.value;
    this.ass.createProfile(payload).pipe(
      first()
    ).subscribe(() => alert("successful"))
  }

}
