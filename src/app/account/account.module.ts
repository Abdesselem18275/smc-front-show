import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account/account.component';
import { SharedModule } from '../shared/shared.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FavoritesProfileComponent } from './favorites-profile/favorites-profile.component';
import { AuthentificationCardComponent } from './authentification-card/authentification-card.component';
@NgModule({
  declarations: [AccountComponent,
                 EditProfileComponent, FavoritesProfileComponent],
  imports: [
    SharedModule,
    AccountRoutingModule
  ],
})
export class AccountModule { }
