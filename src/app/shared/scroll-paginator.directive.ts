import { Directive, EventEmitter, Output, ElementRef, AfterViewInit, Input,
         OnChanges, SimpleChanges, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { throttleTime, map, distinctUntilChanged, skip } from 'rxjs/operators';
import { RootStoreState } from '../root-store';
import { Store } from '@ngrx/store';
import { selectPageParam } from '../root-store/param-store/selectors';
import  * as ParamStore from '../root-store/param-store';
import { ParamType } from '../product/model';
import { AddOrUpdateAction } from '../root-store/param-store/actions';
import { LoadRequestAction } from '../root-store/product-store/actions';

@Directive({
  selector: '[appScrollPaginator]'
})
export class ScrollPaginatorDirective implements AfterViewInit  {


  @Output() public pageNumber: EventEmitter<number> = new EventEmitter();
  @Input()  onViewPort = true;
  private _observerEvents = new Subject<any>();
  constructor(private _element: ElementRef ,
              private store$: Store<RootStoreState.State>,
              private _renderer: Renderer2) { }

  ngAfterViewInit() {
    const rootElement = this.onViewPort === true ? null : this._renderer.parentNode(this._element.nativeElement);
    const options = {
      root : rootElement,
      rootMargin: '0px',
      threshold: 1};
      new IntersectionObserver(entries => this._observerEvents.next(entries), options).
      observe(<Element>(this._element.nativeElement));
      this._observerEvents.asObservable().pipe(throttleTime(1500) , skip(1)).
      subscribe(entries => {
        this.entriesHandler(entries);
      });
  }


   entriesHandler(entries) {
    this.store$.dispatch(ParamStore.ParamStoreActions.NextPageAction());

  }

}
