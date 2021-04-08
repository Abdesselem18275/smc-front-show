import { Subscription } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { Directive, AfterContentInit, OnDestroy, ContentChild, Renderer2, HostListener, Input } from '@angular/core';
import { AccountStateService } from 'src/app/shared/state/account-state.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DialogManagerService } from 'src/app/shared/services/dialog-manager.service';

@Directive({
  selector: '[appFavoriteHandler]'
})
export class FavoriteHandlerDirective implements AfterContentInit,OnDestroy {
  @Input()
  appFavoriteHandler!: number;
  @ContentChild('favIcon')
  matIconComp!: MatIcon;
  matIcon!: HTMLElement;
  subscription!: Subscription ;

  constructor(
    private dms: DialogManagerService,
    private as : AuthService,
    private acc : AccountStateService,
    private renderer: Renderer2) {
   }


   @HostListener('click')
   onClick(): void {
    if(this.as.isLogged) {
      this.acc.toogleFavorite(this.appFavoriteHandler)
    } else {
      this.dms.openCardDialog()

    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  ngAfterContentInit(): void {
    // eslint-disable-next-line no-underscore-dangle
    this.matIcon = this.matIconComp._elementRef.nativeElement;
    this.subscription = this.acc.authProfile.subscribe(profile => {
      this.updateIconStyle(profile?.favorites?.includes(this.appFavoriteHandler) ?? false);
      });
    }

  updateIconStyle(state: boolean): void {
    this.matIconComp.color = (state ? 'primary' : null) as 'primary' | 'accent';
    const property = state ? 'favorite' : 'favorite_border';
    this.renderer.setProperty(this.matIcon,'innerHTML',property);
  }
}
