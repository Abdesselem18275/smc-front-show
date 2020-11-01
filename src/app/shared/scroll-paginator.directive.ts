/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Directive, EventEmitter, Output, ElementRef, AfterViewInit, Input,Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { throttleTime, skip } from 'rxjs/operators';
import { RootStoreState } from '../root-store';
import { Store } from '@ngrx/store';
import  * as ParamStore from '../root-store/param-store';
@Directive({
  selector: '[appScrollPaginator]'
})
export class ScrollPaginatorDirective implements AfterViewInit  {
  @Output() pageNumber: EventEmitter<number> = new EventEmitter();
  @Input()  onViewPort = true;
  private observerEvents = new Subject<IntersectionObserverEntry[]>();
  constructor(private _element: ElementRef ,
              private store$: Store<RootStoreState.State>,
              private _renderer: Renderer2) { }

  ngAfterViewInit():void {
    const rootElement = this.onViewPort === true ? null : this._renderer.parentNode(this._element.nativeElement);
    const options = {
      root : rootElement,
      rootMargin: '0px',
      threshold: 1};
      new IntersectionObserver(entries => this.observerEvents.next(entries), options).
      observe(<Element>(this._element.nativeElement));
      this.observerEvents.asObservable().pipe(throttleTime(1500) , skip(1)).
      subscribe(()=> {
        this.entriesHandler();
      });
  }


   entriesHandler():void {
    const navExtra:NavigationExtras = {
      queryParams : {
        [this.queryParamKeys.PAGE]:this._currentPage+1
      }, 
      queryParamsHandling:'merge'        
    }
    this.router.navigate(['/product/list'],navExtra)

  }

}
