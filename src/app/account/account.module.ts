import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account/account.component';
import { SharedModule } from '../shared/shared.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserRequestListComponent } from './user-request-list/user-request-list.component';
import { CommonModule } from '@angular/common';
import { AccountProfileComponent } from './account-profile/account-profile.component';

@NgModule({
  declarations: [AccountComponent,
                 EditProfileComponent,
                 UserRequestListComponent,
                 AccountProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule
  ],
})
export class AccountModule { }
