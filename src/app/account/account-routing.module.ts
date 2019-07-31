import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path : 'account',
  component : AccountComponent,
  children : [
    {
      path : 'login',
      component : AccountLoginComponent
    },
     {
       path : '',
       canActivate: [AuthGuard],
       children : [
        {
          path : 'profile',
          component : AccountProfileComponent
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
