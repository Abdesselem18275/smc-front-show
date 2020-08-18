import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account/account.component';
import { SharedModule } from '../shared/shared.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserRequestComponent } from './user-request/user-request.component';
import { UserRequestListComponent } from './user-request-list/user-request-list.component';
@NgModule({
  declarations: [AccountComponent,
                 EditProfileComponent,
                 UserRequestComponent,
                 UserRequestListComponent],
  imports: [
    SharedModule,
    AccountRoutingModule
  ],
  exports: [UserRequestComponent]
})
export class AccountModule { }
