import { Directive, ElementRef, AfterViewInit, Input, HostListener } from '@angular/core';
import { FavoriteHandlerService } from './service/favorite-handler.service';
import { filter } from 'rxjs/operators';
import { SmcAuthService } from '../account/service/smc-auth.service';
import { AccountCacheService } from '../account/service/account-cache.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RootStoreState } from '../root-store';
import { Store } from '@ngrx/store';
import { ToggleAction } from '../root-store/modal-store/actions';

@Directive({
  selector: '[appFavoriteHandler]'
})
export class FavoriteHandlerDirective implements AfterViewInit {
  @Input() appFavoriteHandler: number;
  constructor(private _element: ElementRef ,
              private accountCache: AccountCacheService,
              private snakBar: MatSnackBar,
              private store$: Store<RootStoreState.State>,
              private _authService: SmcAuthService ,
              private _favHandlerService: FavoriteHandlerService) {
   }


   ngAfterViewInit() {
    this.updateIconStyle();
     this.accountCache.account$.subscribe( x =>  {
      this.updateIconStyle();
     });
  }

  @HostListener('click')
  onClick() {
    if (this._authService.isLogged()) {
      this._favHandlerService.addRemoveFavorites(this.appFavoriteHandler);
    } else {
      this.snakBar.open('You have to login to perform this action', 'Login')
      .onAction().pipe(filter(x => true)).subscribe(() => {
        this.store$.dispatch(ToggleAction({key: 'loginBox'}));
      });


    }
  }

  updateIconStyle() {
    this._element.nativeElement.style.color =
    this._favHandlerService.checkIsFavorites(this.appFavoriteHandler) ? '#ffab00' : 'rgb(68,68,68)';
  }
}
