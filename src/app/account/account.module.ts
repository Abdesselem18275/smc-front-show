import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account/account.component';
import { SharedModule } from '../shared/shared.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthentificationCardComponent } from './authentification-card/authentification-card.component';
import { ControlValidatorMessageDirective } from './control-validator-message.directive';
import { UserRequestComponent } from './user-request/user-request.component';
@NgModule({
  declarations: [AccountComponent,
                 EditProfileComponent,
                 UserRequestComponent],
  imports: [
    SharedModule,
    AccountRoutingModule
  ],
  exports: [UserRequestComponent]
})
export class AccountModule { }
