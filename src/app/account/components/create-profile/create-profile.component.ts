import { Component} from '@angular/core';
import { FormGroup } from '@angular/forms';
 
import { Observable } from 'rxjs';
import { AccountFormService } from '../../service/account-form.service';
import { GlobalStateService } from 'src/app/shared/state/global-state.service';
import { Country } from 'src/app/models/shared.models';
import { AccountStateService } from 'src/app/shared/state/account-state.service';
import { first } from 'rxjs/operators';

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
              private ass : AccountStateService,
              private gss: GlobalStateService,
              private accountFormService: AccountFormService,
    ) {
      this.isChecking$ = this.gss.isLoading
      this.createForm = this.accountFormService.createAccountForm();
      this.countries$ = this.gss.countries;
     }
  onSubmit(): void {
    this.createForm.enable();
    if(this.createForm.valid) {
      this.ass.createProfile(this.createForm.value).pipe(
        first()
      ).subscribe((x) => alert('succefully created'))
    }
  }

}
