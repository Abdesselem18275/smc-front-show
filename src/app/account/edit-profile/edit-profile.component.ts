import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountFormService } from '../service/account-form.service';
import { SmcAuthService } from '../service/smc-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit  {
  accountForm: FormGroup;
  countryNames: any[];
  isUpdating: boolean;
  constructor(private snakBar: MatSnackBar,
              private accountFormService: AccountFormService ,
              private authService: SmcAuthService) { }

  ngOnInit() {
    this.isUpdating = false;
    this.accountForm = this.accountFormService.createLoadFullAccountForm();
    this.countryNames = this.authService.countries;
  }
  onchanges(val) {
    console.warn(val);
    console.warn(this.accountForm.get('is_professional').value);
    if (!val.checked) {
      this.accountForm.get('company_name').disable();
      this.accountForm.get('position').disable();
      this.accountForm.get('activity_field').disable();
    } else {
      this.accountForm.get('company_name').enable();
      this.accountForm.get('position').enable();
      this.accountForm.get('activity_field').enable();
    }
  }

  onSubmit() {
    this.isUpdating = true;
    const formData =  JSON.stringify(this.accountForm.value, this.accountFormService.editFormReplacer);
    this.authService.updateAccount(formData).subscribe(accountData => {
      this.accountForm = this.accountFormService.createLoadFullAccountForm();
      this.isUpdating = false;
      this.snakBar.open('Succefully modified');
    },
    error => {
           this.isUpdating = false;
           console.warn(error);
    });

  }

}
