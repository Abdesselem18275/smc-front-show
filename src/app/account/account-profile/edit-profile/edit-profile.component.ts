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
  display: boolean;
  constructor(private _modalHandler: ModalHandlerService,
              private accountFormService: AccountFormService ,
              private authService: AuthService) { }

  ngOnInit() {
    this.display = false;
    this.accountForm = this.accountFormService.createLoadFullAccountForm();
    this.countryNames = this.authService.countries;
  }

  onSubmit() {
    const formData =  JSON.stringify(this.accountForm.value, this.accountFormService.editFormReplacer);
    this.authService.updateAccount(formData).subscribe(accountData => {
      this.accountForm = this.accountFormService.createLoadFullAccountForm();
      this._modalHandler.openModal('Succefully modified');


    },
    error => {
           console.warn('Error');
           console.warn(error);
    });

  }

  // openCustom(customClasses: CustomClasses) {
  //   this.snackbar.open(`Changes successfully saved`, '', {
  //     dismiss: true,
  //     classes: customClasses.classes
  //   });
  // }
}
