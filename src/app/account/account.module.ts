import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountLoginComponent } from './components/account-login/account-login.component';
import { AccountProfileComponent } from './components/account-profile/account-profile.component';
import { AccountComponent } from './components/account/account.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { GoogleSignInComponent } from './components/google-sign-in/google-sign-in.component';
import { AuthentificationDialogComponent } from './components/authentification-dialog/authentification-dialog.component';
import { AccountCardComponent } from './components/account-card/account-card.component';

@NgModule({
  declarations: [AccountComponent,
                 EditProfileComponent,
                 AccountLoginComponent,
                 AccountCardComponent,
                 CreateProfileComponent,
                 GoogleSignInComponent,
                 AccountProfileComponent,
                 AuthentificationDialogComponent,
                 ],
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule
  ],
})
export class AccountModule { }
