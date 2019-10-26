import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './auth.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FavoritesProfileComponent } from './favorites-profile/favorites-profile.component';

const routes: Routes = [
  { path : 'account',
  component : AccountComponent,
  children : [
     {
       path : '',
       canActivate: [AuthGuard],
       children : [
        {
          path : 'profile',
          component : EditProfileComponent
        },
        {
          path : 'favorites',
          component : FavoritesProfileComponent
        },
        {
          path : 'messages',
          component : FavoritesProfileComponent
        }
       ]
     }

  ]

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
