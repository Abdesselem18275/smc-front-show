import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AccountLoginComponent } from './components/account-login/account-login.component';
import { AccountProfileComponent } from './components/account-profile/account-profile.component';
import { AccountComponent } from './components/account/account.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
const routes: Routes = [
  { path : '',
  component : AccountComponent,

},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
