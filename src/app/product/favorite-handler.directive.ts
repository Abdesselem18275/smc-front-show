import { Directive, Input, HostListener, OnDestroy, ContentChildren, QueryList, Renderer2, AfterViewChecked } from '@angular/core';
import { RootStoreState } from '../root-store';
import { Store } from '@ngrx/store';
import { UserStoreActions, UserStoreSelectors } from '../root-store/user-store';
import { Subscription } from 'rxjs';
import { MatIcon } from '@angular/material/icon';

@Directive({
  selector: '[appFavoriteHandler]'
})
export class FavoriteHandlerDirective implements AfterViewChecked,OnDestroy {
  @Input()
  appFavoriteHandler: number;
  subscription: Subscription ;
  @ContentChildren('favIcon') matIconList :  QueryList<MatIcon> ;
  matIcon : HTMLElement;

  constructor(
    private renderer: Renderer2,
    private store$: Store<RootStoreState.State>) {
   }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  ngAfterViewChecked():void {
    this.matIcon = <HTMLElement>this.matIconList.first._elementRef.nativeElement
    this.subscription = this.store$.select(UserStoreSelectors.selectIsFavorite, {id : this.appFavoriteHandler}).subscribe(state => {
      this.updateIconStyle(state);
    });
  }

  @HostListener('click')
  onClick():void {
    this.store$.dispatch(UserStoreActions.TriggerFavoriteAction({id: this.appFavoriteHandler}));
  }
  updateIconStyle(state: boolean):void {
    this.renderer.removeClass(this.matIcon,'font--primary')
    const favClass = state ? 'font--primary' : 'font--dark-grey';
    const property = state ? 'favorite' : 'favorite_border';
    this.renderer.addClass(this.matIcon,favClass)
    this.renderer.setProperty(this.matIcon,'innerHTML',property);
  }
}
