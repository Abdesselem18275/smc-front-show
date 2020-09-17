import { Component, OnInit, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectorRef, OnDestroy, ContentChildren, QueryList, ElementRef, ViewChildren } from '@angular/core';
import { AppearanceVariant } from '../../models/product.models';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';
import { throttle, bufferCount} from 'rxjs/operators';
import { fromEvent, merge, Subscription } from 'rxjs';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnDestroy,OnInit,AfterViewInit,OnChanges{
  @Input() appearanceVariant : AppearanceVariant
  anchors: Element;
  imagesArray : string[];
  selectedIndex = 0;
  private subscription : Subscription
  @ViewChild(CdkScrollable, {static : true}) scrollable: CdkScrollable;
  constructor(private scroll: ScrollDispatcher,private cdr: ChangeDetectorRef) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit()
  }

  ngOnInit(): void {
    this.imagesArray = []
    this.imagesArray.push(this.appearanceVariant.thumbNail)
    this.imagesArray = this.imagesArray.concat(this.appearanceVariant.images.map(image => image.content))
    this.cdr.detectChanges()
  }
  ngAfterViewInit() {
    this.anchors = this.scrollable.getElementRef().nativeElement;
    const throttleConfig = {
      leading: true,
      trailing: true
    }
    const touchReducer = (accumulator, currentValue) => accumulator - currentValue;
    this.subscription = fromEvent(this.anchors,'touchmove').
    pipe(
      throttle(x => merge(fromEvent(this.anchors,'touchend'),fromEvent(this.anchors,'touchstart')),throttleConfig),
      bufferCount(2)
    ).
    subscribe((x:TouchEvent[]) => {
      x.map((x:TouchEvent) => x.touches[0].clientX).reduce(touchReducer) < 0 ? this.byStepIndex(-1) : this.byStepIndex(1)
    });
  }

  selectImage(index: number) {
    this.selectedIndex = index;
    this.anchors.scroll({behavior: 'smooth', left: this.anchors.clientWidth * index});
    this.cdr.detectChanges()
  }
  byStepIndex(step) {
    const imagesNumber = this.imagesArray.length;
    let _index = this.selectedIndex + step;
    if ( _index >= imagesNumber  ) {
      _index = 0;
    }
    if ( _index < 0  ) {
      _index = imagesNumber - 1;
    }
    return this.selectImage(_index);
  }
 }
