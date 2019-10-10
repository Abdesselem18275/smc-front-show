import { Directive, ElementRef, AfterViewInit, Input, HostListener } from '@angular/core';
import { AuthService } from '../account/service/auth.service';
import { FavoriteHandlerService } from './service/favorite-handler.service';

@Directive({
  selector: '[appFavoriteHandler]'
})
export class FavoriteHandlerDirective implements AfterViewInit {
  @Input() productId: number;
  constructor(private _element: ElementRef , private _authService: AuthService , private _favHandlerService: FavoriteHandlerService) {
   }


   ngAfterViewInit() {
    this.updateIconStyle();
     this._authService.account$.subscribe( x =>  {
      this.updateIconStyle();
     });
  }

  @HostListener('click')
  onClick() {
    this._favHandlerService.addRemoveFavorites(this.productId);
  }

  updateIconStyle() {
    this._element.nativeElement.style.color =
    this._favHandlerService.checkIsFavorites(this.productId) ? '#ffab00' : 'rgb(68,68,68)';
  }
}
