import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './auth.guard';
import { AuthentificationCardComponent } from './authentification-card/authentification-card.component';

const routes: Routes = [
  { path : '',
  component : AccountComponent,
  children : [
    {
      path :'authentification',
      component: AuthentificationCardComponent
    },
     {
       path : '',
       canActivate: [AuthGuard],
       children : [
        {
          path : 'profile',
          component : AccountProfileComponent
        },
       ]
     }
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
