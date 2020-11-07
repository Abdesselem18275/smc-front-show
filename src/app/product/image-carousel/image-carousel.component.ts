import { Component, OnInit, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectorRef, OnDestroy, ContentChildren, QueryList, ElementRef, ViewChildren } from '@angular/core';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';
import { throttle, bufferCount, take} from 'rxjs/operators';
import { fromEvent, merge, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductImagesDialogComponent } from '../product-images-dialog/product-images-dialog.component';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnDestroy,AfterViewInit{
  @Input() images : string[]
  anchors: Element;
  selectedIndex = 0;
  private subscription : Subscription
  @ViewChild(CdkScrollable, {static : true}) scrollable: CdkScrollable;
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private scroll: ScrollDispatcher,
    private cdr: ChangeDetectorRef) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
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
    const imagesNumber = this.images.length;
    let _index = this.selectedIndex + step;
    if ( _index >= imagesNumber  ) {
      _index = 0;
    }
    if ( _index < 0  ) {
      _index = imagesNumber - 1;
    }
    return this.selectImage(_index);
  }
  openImagesDialog() {
    this.route.data.pipe(take(1)).subscribe(
      data => {
        const dialogRef = this.dialog.open(ProductImagesDialogComponent, {
          width: '520px',
          maxWidth:'100vw',
          maxHeight:'95vh',
          data: {product : data.product}
        });
      }
    )}
 }
