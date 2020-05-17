import { Injectable } from '@angular/core';
import { SmcAuthService } from 'src/app/account/service/smc-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

// @Injectable({
//   providedIn: 'root'
// })
// export class FavoriteHandlerService {

//   constructor(private snakBar: MatSnackBar ,
//              private authService: SmcAuthService) { }

//   checkIsFavorites(id: number): boolean {

//     return this.authService.isLogged() ? this.accountCache.account.favorites.includes(id) : false;
//   }

//   addRemoveFavorites(id: number) {
//     const myAccount  = this.accountCache.account;
//     const exist = this.checkIsFavorites(id);
//     if (exist) {
//       myAccount.favorites = myAccount.favorites.filter( x => x !== id );
//     } else {
//       myAccount.favorites.push(id);
//     }
//     delete myAccount.profile;
//     this.authService.updateProfile(myAccount).subscribe( () => {
//       this.snakBar.open(exist ? 'Unmarked as favorite.' : 'Marked as favorite.');
//     });
//   }
// }
