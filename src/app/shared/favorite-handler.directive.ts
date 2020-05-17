import { Directive, ElementRef, AfterViewInit, Input, HostListener, OnDestroy } from '@angular/core';
import { filter, tap, map } from 'rxjs/operators';
import { SmcAuthService } from '../account/service/smc-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RootStoreState } from '../root-store';
import { Store } from '@ngrx/store';
import { ToggleAction } from '../root-store/modal-store/actions';
import { selectIsFavorite } from '../root-store/user-store/selectors';
import { UserStoreActions } from '../root-store/user-store';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appFavoriteHandler]'
})
export class FavoriteHandlerDirective implements AfterViewInit,OnDestroy {
  @Input() appFavoriteHandler: number;
  subscription: Subscription ;
  constructor(private _element: ElementRef ,
              private snakBar: MatSnackBar,
              private store$: Store<RootStoreState.State>,
              private _authService: SmcAuthService) {
   }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


   ngAfterViewInit() {
    this.subscription = this.store$.select(selectIsFavorite, {id : this.appFavoriteHandler}).subscribe(state => {
      this.updateIconStyle(state);
    });
  }

  @HostListener('click')
  onClick() {
    if (this._authService.isLogged()) {
      this.store$.dispatch(UserStoreActions.UserRefreshAction());
      this.store$.dispatch(UserStoreActions.ToggleFavoriteAction({id: this.appFavoriteHandler}));
    } else {
      this.snakBar.open('You have to login to perform this action', 'Login')
      .onAction().pipe(filter(x => true)).subscribe(() => {
        this.store$.dispatch(ToggleAction({key: 'loginBox'}));
      });
    }
  }

  updateIconStyle(state: boolean) {
    console.warn(state);
    this._element.nativeElement.style.color = state ? '#ffab00' : 'rgb(68,68,68)';
  }
}
