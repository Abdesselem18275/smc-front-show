import { Injectable, ɵConsole } from '@angular/core';
import { AuthService } from 'src/app/account/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteHandlerService {

  constructor(private _authService: AuthService) { }

  checkIsFavorites(id: number): boolean {
    return this._authService.account.favorites.includes(id);
  }

  addRemoveFavorites(id: number) {
    const myAccount  = this._authService.account;
    if (this.checkIsFavorites(id)) {
      myAccount.favorites = myAccount.favorites.filter( x => x !== id );
    } else {
      myAccount.favorites.push(id);
    }
    delete myAccount.profile;
    this._authService.updateAccount(myAccount).subscribe( () => {
    });
  }
}
