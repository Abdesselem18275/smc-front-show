import { Injectable } from '@angular/core';
import { ModalHandlerService } from './modal-handler.service';
import { SmcAuthService } from 'src/app/account/service/smc-auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteHandlerService {

  constructor(private _modalHandler: ModalHandlerService ,
             private _authService: SmcAuthService) { }

  checkIsFavorites(id: number): boolean {

    return this._authService.isLogged() ? this._authService.account.favorites.includes(id) : false;
  }

  addRemoveFavorites(id: number) {
    const myAccount  = this._authService.account;
    const exist = this.checkIsFavorites(id);
    if (exist) {
      myAccount.favorites = myAccount.favorites.filter( x => x !== id );
    } else {
      myAccount.favorites.push(id);
    }
    delete myAccount.profile;
    this._authService.updateAccount(myAccount).subscribe( () => {
      this._modalHandler.openSnak(exist ? 'Unmarked as favorite.' : 'Marked as favorite.');
    });
  }
}
