import { Directive, ElementRef, AfterViewInit, Input, HostListener, OnDestroy, ViewChild, ContentChildren, QueryList, Renderer2 } from '@angular/core';
import { RootStoreState } from '../root-store';
import { Store } from '@ngrx/store';
import { selectIsFavorite } from '../root-store/user-store/selectors';
import { UserStoreActions } from '../root-store/user-store';
import { Subscription } from 'rxjs';
import { MatIcon } from '@angular/material/icon';

@Directive({
  selector: '[appFavoriteHandler]'
})
export class FavoriteHandlerDirective implements AfterViewInit,OnDestroy {
  @Input() 
  appFavoriteHandler: number;
  subscription: Subscription ;
  @ContentChildren('favIcon') 
  matIconList :  QueryList<MatIcon> ;
  matIcon : HTMLElement;

  constructor(
    private renderer: Renderer2,
    private store$: Store<RootStoreState.State>) {
   }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


   ngAfterViewInit() {
    this.matIcon = this.matIconList.first._elementRef.nativeElement
    this.subscription = this.store$.select(selectIsFavorite, {id : this.appFavoriteHandler}).subscribe(state => {
      this.updateIconStyle(state);
    });
  }

  @HostListener('click')
  onClick() {
    this.store$.dispatch(UserStoreActions.TriggerFavoriteAction({id: this.appFavoriteHandler}));
  }
  updateIconStyle(state: boolean) {
    this.renderer.removeClass(this.matIcon,'font--primary')
    const favClass = state ? 'font--primary' : 'font--dark-grey';
    const property = state ? 'favorite' : 'favorite_border';
    this.renderer.addClass(this.matIcon,favClass)
    this.renderer.setProperty(this.matIcon,'innerHTML',property);
  }
}
