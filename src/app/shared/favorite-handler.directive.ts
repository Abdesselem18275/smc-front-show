import { Directive, ElementRef, AfterViewInit, Input, HostListener } from '@angular/core';
import { FavoriteHandlerService } from './service/favorite-handler.service';
import { ModalHandlerService } from './service/modal-handler.service';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SmcAuthService } from '../account/service/smc-auth.service';

@Directive({
  selector: '[appFavoriteHandler]'
})
export class FavoriteHandlerDirective implements AfterViewInit {
  @Input() appFavoriteHandler: number;
  constructor(private _element: ElementRef ,
              private _authService: SmcAuthService ,
              private _favHandlerService: FavoriteHandlerService ,
              private _modalHandler: ModalHandlerService,
              private router: Router) {
   }


   ngAfterViewInit() {
    this.updateIconStyle();
     this._authService.account$.subscribe( x =>  {
      this.updateIconStyle();
     });
  }

  @HostListener('click')
  onClick() {
    if (this._authService.isLogged()) {
      this._favHandlerService.addRemoveFavorites(this.appFavoriteHandler);
    } else {
      this._modalHandler.openSnak('You have to login to perform this action', 'Login').
      afterDismiss().pipe(filter(x => x === 'action')).subscribe(() => {
        this._modalHandler.toggleModal('loginBox');
      });


    }
  }

  updateIconStyle() {
    this._element.nativeElement.style.color =
    this._favHandlerService.checkIsFavorites(this.appFavoriteHandler) ? '#ffab00' : 'rgb(68,68,68)';
  }
}
