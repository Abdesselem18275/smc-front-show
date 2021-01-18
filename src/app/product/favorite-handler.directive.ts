import { Directive, Input, HostListener, OnDestroy, Renderer2, AfterContentInit, ContentChild } from '@angular/core';
import { RootStoreState } from '../root-store';
import { Store } from '@ngrx/store';
import { UserStoreActions, UserStoreSelectors } from '../root-store/user-store';
import { Subscription } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

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
    private router: Router,
    private renderer: Renderer2,
    private store$: Store<RootStoreState.State>) {
   }


   @HostListener('click')
   onClick(): void {
     this.store$.select(UserStoreSelectors.selectIsAuthentificated).pipe(
       take(1),
     ).subscribe((isAuth) => {
       if(isAuth) {
        this.store$.dispatch(UserStoreActions.ToggleFavoriteAction({id: this.appFavoriteHandler}));
       } else {
        this.store$.dispatch(UserStoreActions.RedirectForAuthentification({redirectUrl:this.router.url}));
       }
     });  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  ngAfterContentInit(): void {

    // eslint-disable-next-line no-underscore-dangle
    this.matIcon = this.matIconComp._elementRef.nativeElement;
    this.subscription = this.store$.select(UserStoreSelectors.selectIsFavorite, {id : this.appFavoriteHandler}).subscribe(state => {
      this.updateIconStyle(state);
      });
    }

  updateIconStyle(state: boolean): void {
    this.matIconComp.color = (state ? 'primary' : null) as 'primary' | 'accent';
    const property = state ? 'favorite' : 'favorite_border';
    this.renderer.setProperty(this.matIcon,'innerHTML',property);
  }
}
