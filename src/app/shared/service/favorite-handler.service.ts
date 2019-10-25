import { Injectable } from '@angular/core';
import { ModalHandlerService } from './modal-handler.service';
import { SmcAuthService } from 'src/app/account/service/smc-auth.service';
import { AccountCacheService } from 'src/app/account/service/account-cache.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteHandlerService {

  constructor(private _modalHandler: ModalHandlerService ,
             private accountCache: AccountCacheService,
             private authService: SmcAuthService) { }

  checkIsFavorites(id: number): boolean {

    return this.authService.isLogged() ? this.accountCache.account.favorites.includes(id) : false;
  }

  addRemoveFavorites(id: number) {
    const myAccount  = this.accountCache.account;
    const exist = this.checkIsFavorites(id);
    if (exist) {
      myAccount.favorites = myAccount.favorites.filter( x => x !== id );
    } else {
      myAccount.favorites.push(id);
    }
    delete myAccount.profile;
    this.authService.updateAccount(myAccount).subscribe( () => {
      this._modalHandler.openSnak(exist ? 'Unmarked as favorite.' : 'Marked as favorite.');
    });
  }
}
