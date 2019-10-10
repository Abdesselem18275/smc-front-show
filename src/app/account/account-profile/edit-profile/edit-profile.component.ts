import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountFormService } from '../../service/account-form.service';
import { AuthService } from '../../service/auth.service';
import { MdcSnackbar } from '@angular-mdc/web';

interface CustomClasses {
  classes?: string | string[];
  actionClasses?: string | string[];
  dismissClasses?: string | string[];
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  accountForm: FormGroup;
  countryNames: any[];
  display: boolean;
  constructor(private snackbar: MdcSnackbar , private accountFormService: AccountFormService , private authService: AuthService) { }

  ngOnInit() {
    this.display = false;
    this.accountForm = this.accountFormService.createLoadFullAccountForm();
    this.countryNames = this.authService.countries;
  }

  onSubmit() {
    const formData =  JSON.stringify(this.accountForm.value, this.accountFormService.editFormReplacer);
    this.authService.updateAccount(formData).subscribe(accountData => {
      this.accountForm = this.accountFormService.createLoadFullAccountForm();
      this.openCustom({classes: 'custom-snackbar--shape-radius'});


    },
    error => {
           console.warn('Error');
           console.warn(error);
    });

  }

  openCustom(customClasses: CustomClasses) {
    this.snackbar.open(`Changes successfully saved`, '', {
      dismiss: true,
      classes: customClasses.classes
    });
  }
}
