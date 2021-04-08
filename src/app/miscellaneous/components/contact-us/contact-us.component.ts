import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 
import { take, filter } from 'rxjs/operators';
import { Profile } from 'src/app/models/account.models';
import { AppDataService } from 'src/app/shared/services/app-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountStateService } from 'src/app/shared/state/account-state.service';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent  {
  askForm: FormGroup;
  constructor(
    private snackBar: MatSnackBar,
    private ads: AppDataService,
    private fb: FormBuilder,
    private ass : AccountStateService) {
    this.askForm = this.fb.group({
      first_name : ['',Validators.required],
      last_name : ['',Validators.required],
      email: ['' ,[Validators.required,Validators.email]],
      message:  ['',Validators.required],
      user:['']
    });
    this.ass.authProfile.pipe(
      take(1),
      filter(profile => profile ? true : false)).subscribe((profile: Profile) => {
          this.askForm.patchValue({
            first_name:profile.firstName,
            last_name:profile.lastName,
            email:profile.email,
            user : profile.id
          });
    });
   }
   onSubmit() {
     this.askForm.markAsDirty();
     this.askForm.enable();
     if(this.askForm.valid) {
      this.ads.post<any>('/requests/',JSON.stringify(this.askForm.value)).pipe(
        take(1)
      ).subscribe(
        () => this.snackBar.open('We have received your request,will answer you soon','')
      );
     }

   }
}
