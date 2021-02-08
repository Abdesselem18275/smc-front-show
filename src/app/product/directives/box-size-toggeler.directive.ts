import { Directive, ContentChildren, QueryList, AfterViewInit, ElementRef, OnDestroy, HostListener, Renderer2 } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Subscription, fromEvent, pipe, combineLatest } from 'rxjs';
import { UserStoreActions } from '../../root-store/user-store';
import { ProductStoreActions, ProductStoreSelectors } from '../../root-store';
import { withLatestFrom, map, startWith, debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appBoxSizeToggeler]'
})
export class BoxSizeToggelerDirective implements AfterViewInit ,OnDestroy{
  @ContentChildren('boxSizeIcon') matIconList:  QueryList<MatIcon> ;
  @ContentChildren('boxSizeText') spanList:  QueryList<ElementRef> ;
  matIcon: HTMLElement;
  spanEl: HTMLElement;
  subscription: Subscription ;


  constructor(
    private renderer: Renderer2,
    private store$: Store) { }

  @HostListener('click')
  onClick() {
      this.store$.dispatch(ProductStoreActions.ToggleBoxSizeAction());
    }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
        this.matIcon = this.matIconList.first._elementRef.nativeElement;
        this.spanEl = this.spanList.first.nativeElement;
        this.subscription = combineLatest([
          this.store$.select(ProductStoreSelectors.selectIsBigBoxSize),
          fromEvent(window, 'resize').pipe(
            debounceTime(1000),
            map(event => (event.target as Window).innerWidth),
            startWith(window.innerWidth),
          )]).
          subscribe(x => {
            this.updateButtonContent(x);
        });

  }



  updateButtonContent(payload) {
    const innerWidth = payload[1];
    const isBig = payload[0];
    let iconName = !isBig ? 'view_module':'view_comfy';

    if ( innerWidth < 850) {
      iconName = !isBig ? 'view_stream':'view_module';
    }

    const spanText = isBig ? 'SMALL': 'BIG';
    this.renderer.setProperty(this.spanEl,'innerHTML',spanText);
    this.renderer.setProperty(this.matIcon,'innerHTML',iconName);

  }

}
