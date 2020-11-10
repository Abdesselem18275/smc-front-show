import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserStoreSelectors } from 'src/app/root-store/user-store';
import { take, filter, catchError, tap } from 'rxjs/operators';
import { Profile } from 'src/app/models/account.models';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppDataService } from 'src/app/shared/service/app-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent  {
  askForm:FormGroup
  constructor(private snackBar : MatSnackBar,private ads:AppDataService,private fb:FormBuilder,private store$:Store<any>) {
    this.askForm = this.fb.group({
      name : ['',Validators.required],
      email: ['' ,[Validators.required,Validators.email]],
      message:  ['',Validators.required],
    })
    this.store$.select(UserStoreSelectors.selectUser).pipe(
      take(1),
      filter(profile => profile ? true : false)).subscribe((profile:Profile) => {
          this.askForm.patchValue({
            name:`${profile.first_name} ${profile.last_name}`,
            email:profile.email
          })
    })
   }
   onSubmit() {
     this.askForm.markAsDirty()
     this.askForm.enable()
     if(this.askForm.valid) {
      this.ads.post('/account/requests',JSON.stringify(this.askForm.value)).pipe(
        take(1)
      ).subscribe(
        () => this.snackBar.open('We have received yout request \nwill answer you soon','')
      )
     }

   }
}