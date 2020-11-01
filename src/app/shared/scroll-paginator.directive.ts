/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Directive, EventEmitter, Output, ElementRef, AfterViewInit, Input,Renderer2, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { throttleTime, skip, filter, tap } from 'rxjs/operators';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { QUERY_PARAM_KEYS } from '../injectables';
const PAGE_PARAM_KEY = 'page'
@Directive({
  selector: '[appScrollPaginator]'
})
export class ScrollPaginatorDirective implements AfterViewInit  {
  @Input()  onViewPort = true
  @Input()  pagesCount : number;

  _currentPage: number;
  _ItemCount: number
  private observerEvents = new Subject<IntersectionObserverEntry[]>();
  constructor(private _element: ElementRef ,
              private route : ActivatedRoute,
              @Inject(QUERY_PARAM_KEYS) private queryParamKeys: any,
              private router: Router,
              private _renderer: Renderer2) {
                this.route.queryParamMap.subscribe(queryParamMap => { 
                  this._currentPage = this.route.snapshot.queryParamMap.has(queryParamKeys.PAGE) ?
                  parseInt(this.route.snapshot.queryParamMap.get(PAGE_PARAM_KEY)): 1})
               }

  ngAfterViewInit():void {
    const rootElement = this.onViewPort === true ? null : this._renderer.parentNode(this._element.nativeElement);
    const options = {
      root : rootElement,
      rootMargin: '0px',
      threshold: 1};
      new IntersectionObserver(entries => this.observerEvents.next(entries), options).
      observe(<Element>(this._element.nativeElement));
      this.observerEvents.asObservable().pipe(
        filter(() => this._currentPage < this.pagesCount),
        tap(() => console.warn(`current page ${this._currentPage} pages count ${this.pagesCount}`)),

        throttleTime(1500) , 
        skip(1)).
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
