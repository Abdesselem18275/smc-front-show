import { Directive, EventEmitter, Output, ElementRef, AfterViewInit, Input,
         OnChanges, SimpleChanges, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[appScrollPaginator]'
})
export class ScrollPaginatorDirective implements AfterViewInit , OnChanges  {


  @Output() public pageNumber: EventEmitter<number> = new EventEmitter();
  @Input()  objectsNumber: number;
  @Input()  onViewPort = true;
  private _pageCounter: number;
  private _pageNumber: number;
  private _elementsPerPage = 10;
  private _observerEvents = new Subject<any>();


  constructor(private _element: ElementRef , private _renderer: Renderer2) { }

  ngAfterViewInit() {
    this._pageNumber = Math.ceil(this.objectsNumber / this._elementsPerPage);
    this._pageCounter = 1;
    const rootElement = this.onViewPort === true ? null : this._renderer.parentNode(this._element.nativeElement);
    const options = {
      root : rootElement,
      rootMargin: '0px',
      threshold: 1};
      new IntersectionObserver(entries => this._observerEvents.next(entries), options).
      observe(<Element>(this._element.nativeElement));
      this._observerEvents.asObservable().pipe(throttleTime(1500)).
      subscribe(entries => {
        this.entriesHandler(entries);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    this._pageNumber = Math.ceil(this.objectsNumber / this._elementsPerPage);
    this._pageCounter = 1;
    //this.pageNumber.emit(this._pageCounter);
  }

   entriesHandler(entries) {
    if (this._pageCounter + 1  <= this._pageNumber ) {
      this._pageCounter = this._pageCounter + 1 ;
      this.pageNumber.emit(this._pageCounter);
    }

  }

}
