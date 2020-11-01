import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './auth.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import {AuthentificationCardComponent } from './authentification-card/authentification-card.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
const routes: Routes = [
  { path : '',
  component : AccountComponent,
  children : [
    {
      path :'authentification',
      component: AuthentificationCardComponent,
      children: [
        {
          path:'login',
          component:AccountLoginComponent,
        },
        {
          path:'create-profile',
          component:CreateProfileComponent,
        }, 
        {
          path:'',
          redirectTo:'login'
        }
      ]
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
