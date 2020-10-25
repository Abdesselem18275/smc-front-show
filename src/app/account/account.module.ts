import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account/account.component';
import { SharedModule } from '../shared/shared.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserRequestListComponent } from './user-request-list/user-request-list.component';
import { CommonModule } from '@angular/common';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { AuthentificationCardComponent } from './authentification-card/authentification-card.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { InitialsIconComponent } from './initials-icon/initials-icon.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountCardComponent } from './account-card/account-card.component';
import { GoogleSignInComponent } from './google-sign-in/google-sign-in.component';

@NgModule({
  declarations: [AccountComponent,
                 EditProfileComponent,
                 AccountLoginComponent,
                 InitialsIconComponent,
                 CreateProfileComponent,
                 GoogleSignInComponent,
                 AccountCardComponent,
                 AuthentificationCardComponent,
                 UserRequestListComponent,
                 AccountProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule
  ],
})
export class AccountModule { }
