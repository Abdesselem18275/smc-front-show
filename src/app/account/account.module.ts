import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountLoginComponent } from './components/account-login/account-login.component';
import { AccountProfileComponent } from './components/account-profile/account-profile.component';
import { AccountComponent } from './components/account/account.component';
import { AuthentificationCardComponent } from './components/authentification-card/authentification-card.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { GoogleSignInComponent } from './components/google-sign-in/google-sign-in.component';

@NgModule({
  declarations: [AccountComponent,
                 EditProfileComponent,
                 AccountLoginComponent,
                 CreateProfileComponent,
                 GoogleSignInComponent,
                 AuthentificationCardComponent,
                 AccountProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule
  ],
})
export class AccountModule { }
