import { Directive, AfterViewInit, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appScroller]'
})
export class ScrollerDirective implements AfterViewInit , OnChanges {

  @Input() appScroller: number;

  ngAfterViewInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this._element.nativeElement.offsetTop;

  }

  constructor(private _element: ElementRef) { }

}
