import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account/account.component';
import { SharedModule } from '../shared/shared.module';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { EditProfileComponent } from './account-profile/edit-profile/edit-profile.component';
import { FavoritesProfileComponent } from './account-profile/favorites-profile/favorites-profile.component';
import { LoginContainerComponent } from './login-container/login-container.component';

@NgModule({
  declarations: [AccountComponent, AccountProfileComponent,
                 EditProfileComponent, FavoritesProfileComponent, LoginContainerComponent],
  imports: [
    SharedModule,
    AccountRoutingModule
  ],
})
export class AccountModule { }
