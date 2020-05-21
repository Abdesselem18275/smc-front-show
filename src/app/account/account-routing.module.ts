import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './auth.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

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
