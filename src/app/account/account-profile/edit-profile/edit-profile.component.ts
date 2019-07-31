import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountFormService } from '../../service/account-form.service';
import { AuthService } from '../../service/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  accountForm: FormGroup;
  countryNames: any[];
  display: boolean;
  countrySelections: string[];
  constructor(private accountFormService: AccountFormService , private authService: AuthService) { }

  ngOnInit() {
    this.display = false;
    this.accountForm = this.accountFormService.createLoadFullAccountForm();
    this.countryNames = this.authService.countries;
    this.accountForm.get('country').valueChanges.pipe(tap(data => {
          if (data === '') {
            this.display = false;
          } else {
            this.display = true;
          }
    })).subscribe(data => {
      this.countrySelections = this.countryNames.filter(x =>
        x['val'].toUpperCase().trim().indexOf(data.toUpperCase().trim()) !== -1
      );
    });
  }

  onClickCountry(data) {
    this.accountForm.get('country').setValue(data);
    this.display = false;

  }
  onSubmit() {
    let formData =  JSON.stringify(this.accountForm.value, this.accountFormService.editFormReplacer);
    console.warn(formData);

  }
}
