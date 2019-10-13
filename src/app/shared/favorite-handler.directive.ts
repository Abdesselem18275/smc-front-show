import { Directive, ElementRef, AfterViewInit, Input, HostListener } from '@angular/core';
import { AuthService } from '../account/service/auth.service';
import { FavoriteHandlerService } from './service/favorite-handler.service';
import { ModalHandlerService } from './service/modal-handler.service';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Directive({
  selector: '[appFavoriteHandler]'
})
export class FavoriteHandlerDirective implements AfterViewInit {
  @Input() appFavoriteHandler: number;
  constructor(private _element: ElementRef ,
              private _authService: AuthService ,
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
      this._modalHandler.openModal('You have to login to perform this action', 'Login').
      afterDismiss().pipe(filter(x => x === 'action')).subscribe(() => {
        this.router.navigate([{ outlets: { popup: ['login']  }}]);
      });


    }
  }

  updateIconStyle() {
    this._element.nativeElement.style.color =
    this._favHandlerService.checkIsFavorites(this.appFavoriteHandler) ? '#ffab00' : 'rgb(68,68,68)';
  }
}
