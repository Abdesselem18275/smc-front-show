import { Component, Input, ViewChild, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
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
  @Input() images: string[] = [];
  @ViewChild(CdkScrollable, { static: true })
  scrollable!: CdkScrollable;
  anchors!: Element;
  selectedIndex = 0;
  private subscription!: Subscription;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.anchors = this.scrollable.getElementRef().nativeElement;
    const throttleConfig = {
      leading: true,
      trailing: true
    };
    const touchReducer = (accumulator: number, currentValue: number) => accumulator - currentValue;
    this.subscription = fromEvent(this.anchors,'touchmove').
    pipe(
      throttle(() => merge(fromEvent(this.anchors,'touchend'),fromEvent(this.anchors,'touchstart')),throttleConfig),
      bufferCount(2)
    ).
    subscribe((touchEvents: Event[]) => {
      touchEvents as TouchEvent[];
      if (touchEvents.map((x: Event) => (x as TouchEvent).touches[0].clientX).reduce(touchReducer) < 0) {
        this.byStepIndex(-1);
      } else {
        this.byStepIndex(1);
      }
    },
    () => {});
  }

  selectImage(index: number) {
    this.selectedIndex = index;
    this.anchors.scroll({behavior: 'smooth', left: this.anchors.clientWidth * index});
    this.cdr.detectChanges();
  }
  byStepIndex(step: number) {
    const imagesNumber = this.images.length;
    let index = this.selectedIndex + step;
    if ( index >= imagesNumber  ) {
      index = 0;
    }
    if ( index < 0  ) {
      index = imagesNumber - 1;
    }
    return this.selectImage(index);
  }
  openImagesDialog() {
    this.route.data.pipe(take(1)).subscribe(
      data => {
      }
    );}
 }
