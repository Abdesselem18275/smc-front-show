import { Directive, EventEmitter, Output, ElementRef, AfterViewInit, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appScrollPaginator]'
})
export class ScrollPaginatorDirective implements AfterViewInit , OnChanges  {


  @Output() public pageNumber: EventEmitter<number> = new EventEmitter();
  @Input()  objectsNumber;
  private _intersectionObserver?: IntersectionObserver;
  private _pageCounter: number;
  private _pageNumber: number;
  private _elementsPerPage = 10;


  constructor(private _element: ElementRef) { }

  ngAfterViewInit() {
    this._pageNumber = Math.ceil(this.objectsNumber / this._elementsPerPage);
    this._pageCounter = 1;
    const options = {
      root : null,
      rootMargin: '40px',
      threshold: 0.8 };

    this._intersectionObserver = new IntersectionObserver(entries => this.entriesHandler(entries), 
    options);

    this._intersectionObserver.observe(<Element>(this._element.nativeElement));
  }

  ngOnChanges(changes: SimpleChanges) {
    console.warn(changes);
    this._pageNumber = Math.ceil(this.objectsNumber / this._elementsPerPage);
    this._pageCounter = 1;
    this.pageNumber.emit(this._pageCounter);
  }

   entriesHandler(entries) {
    if (this._pageCounter + 1  <= this._pageNumber ) {
      this._pageCounter = this._pageCounter + 1 ;
      this.pageNumber.emit(this._pageCounter);
    }
    console.warn(this._pageCounter);

  }

}
