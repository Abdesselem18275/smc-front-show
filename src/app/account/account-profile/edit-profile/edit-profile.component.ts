import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountFormService } from '../../service/account-form.service';
import { AuthService } from '../../service/auth.service';
import { ModalHandlerService } from 'src/app/shared/service/modal-handler.service';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  accountForm: FormGroup;
  countryNames: any[];
  isUpdating: boolean;
  constructor(private _modalHandler: ModalHandlerService,
              private accountFormService: AccountFormService ,
              private authService: AuthService) { }

  ngOnInit() {
    this.isUpdating = false;
    this.accountForm = this.accountFormService.createLoadFullAccountForm();
    this.countryNames = this.authService.countries;
  }


  onchanges(val) {
    this.accountForm.get('is_professional').setValue(val.checked);
    if (!val.checked) {
      this.accountForm.get('company_name').disable();
      this.accountForm.get('position').disable();
      this.accountForm.get('activity').disable();
    } else {
      this.accountForm.get('company_name').enable();
      this.accountForm.get('position').enable();
      this.accountForm.get('activity').enable();
    }
  }

  onSubmit() {
    this.isUpdating = true;
    const formData =  JSON.stringify(this.accountForm.value, this.accountFormService.editFormReplacer);
    console.warn(formData);
    this.authService.updateAccount(formData).subscribe(accountData => {
      this.accountForm = this.accountFormService.createLoadFullAccountForm();
      this.isUpdating = false;
      this._modalHandler.openSnak('Succefully modified');


    },
    error => {
           this.isUpdating = false;
           console.warn(error);
    });

  }

}
