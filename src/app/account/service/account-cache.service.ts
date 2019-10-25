import { Injectable } from '@angular/core';
import { UserAccount, Profile } from '../model';
import { BehaviorSubject } from 'rxjs';
import { SmcAuthService } from './smc-auth.service';
import { LocalStorageHandlerService } from 'src/app/shared/service/local-storage-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AccountCacheService {
  _account: UserAccount;
  _token: string;
  account$: BehaviorSubject<UserAccount>;

  constructor(private appStorage: LocalStorageHandlerService) {

    this.account$ = new BehaviorSubject<UserAccount>(this._account);

   }
  refreshAccount() {
      this._account = new UserAccount(this.appStorage.getAll());
      const profile = new Profile({
        first_name : this.appStorage.get('first_name'),
        last_name : this.appStorage.get('last_name'),
        email : this.appStorage.get('email')
      });
      this._account.favorites = this.appStorage.get('favorites') === '' ?
                                    [] : this.appStorage.get('favorites').split(',').map( x => Number(x));
      this._account.profile = profile;
      this.account$.next(this._account);
  }

  get account() {
    if (!this._account) {
      this.refreshAccount();
    }
    return this._account;
  }
  get token() {
    if (!this._token) {
      this._token = this.appStorage.get('token');
    }
    return this.appStorage.get('token');
  }
}
