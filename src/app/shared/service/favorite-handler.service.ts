import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/account/service/auth.service';
import { ModalHandlerService } from './modal-handler.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteHandlerService {

  constructor(private _modalHandler: ModalHandlerService ,
             private _authService: AuthService) { }

  checkIsFavorites(id: number): boolean {
    return this._authService.account.favorites.includes(id);
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
      this._modalHandler.openModal(exist ? 'Unmarked as favorite.' : 'Marked as favorite.');
    });
  }
}
