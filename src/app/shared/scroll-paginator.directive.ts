import { Directive, EventEmitter, Output, ElementRef, AfterViewInit, Input,Renderer2, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { throttleTime, skip, filter, tap, switchMap, withLatestFrom, delay } from 'rxjs/operators';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { QUERY_PARAM_KEYS } from '../injectables';
import { Store } from '@ngrx/store';
import { ProductStoreSelectors } from '../root-store';
const PAGE_PARAM_KEY = 'page';
@Directive({
  selector: '[appScrollPaginator]'
})
export class ScrollPaginatorDirective implements AfterViewInit  {
  @Input()  onViewPort = true;
  @Input()  pagesCount!: number;

  currentPage = 0;
  isLoading$: Observable<boolean>;
  private observerEvents = new Subject<IntersectionObserverEntry[]>();
  constructor(private element: ElementRef<Element> ,
              private route: ActivatedRoute,
              private store$: Store<any>,
              @Inject(QUERY_PARAM_KEYS) private queryParamKeys: any,
              private router: Router,
              private renderer: Renderer2) {
                this.isLoading$ = this.store$.select(ProductStoreSelectors.selectIsLoading);
                this.route.queryParamMap.subscribe(queryParamMap => {
                  this.currentPage = parseInt(this.route.snapshot.queryParamMap.get(PAGE_PARAM_KEY) ?? '1',10);});
               }

  ngAfterViewInit(): void {
    const rootElement = this.onViewPort === true ? null : this.renderer.parentNode(this.element.nativeElement);
    console.warn(rootElement);
    const options = {
      root : rootElement,
      rootMargin: '0px',
      threshold: 0.8};
      new IntersectionObserver(entries => this.observerEvents.next(entries), options).
      observe(this.element.nativeElement);
      this.observerEvents.asObservable().pipe(
        filter(() => this.currentPage < this.pagesCount),
        withLatestFrom(this.isLoading$),
        filter((x: [IntersectionObserverEntry[], boolean])=> !x[1]),
        tap(() => console.warn(`current page ${this.currentPage} pages count ${this.pagesCount}`)),
        throttleTime(1000) ,
        // skip(1)
        ).
      subscribe(()=> {
        this.entriesHandler();
      });
  }


   entriesHandler(): void {
    const navExtra: NavigationExtras = {
      queryParams : {
        [this.queryParamKeys.PAGE]:this.currentPage+1
      },
      queryParamsHandling:'merge'
    };
    this.router.navigate(['/product/list'],navExtra);

  }

}
