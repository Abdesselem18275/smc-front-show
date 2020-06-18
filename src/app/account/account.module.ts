import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account/account.component';
import { SharedModule } from '../shared/shared.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthentificationCardComponent } from './authentification-card/authentification-card.component';
import { ControlValidatorMessageDirective } from './control-validator-message.directive';
@NgModule({
  declarations: [AccountComponent,
                 EditProfileComponent],
  imports: [
    SharedModule,
    AccountRoutingModule
  ],
})
export class AccountModule { }
