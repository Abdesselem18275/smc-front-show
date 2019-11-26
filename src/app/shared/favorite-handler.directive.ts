import { Directive, ElementRef, AfterViewInit, Input, HostListener } from '@angular/core';
import { FavoriteHandlerService } from './service/favorite-handler.service';
import { ModalHandlerService } from './service/modal-handler.service';
import { filter } from 'rxjs/operators';
import { SmcAuthService } from '../account/service/smc-auth.service';
import { AccountCacheService } from '../account/service/account-cache.service';

@Directive({
  selector: '[appFavoriteHandler]'
})
export class FavoriteHandlerDirective implements AfterViewInit {
  @Input() appFavoriteHandler: number;
  constructor(private _element: ElementRef ,
              private accountCache: AccountCacheService,
              private _authService: SmcAuthService ,
              private _favHandlerService: FavoriteHandlerService ,
              private _modalHandler: ModalHandlerService) {
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
      this._modalHandler.openSnak('You have to login to perform this action', 'Login')
      .onAction().pipe(filter(x => true)).subscribe(() => {
        this._modalHandler.toggleModal('loginBox');
      });


    }
  }

  updateIconStyle() {
    this._element.nativeElement.style.color =
    this._favHandlerService.checkIsFavorites(this.appFavoriteHandler) ? '#ffab00' : 'rgb(68,68,68)';
  }
}
