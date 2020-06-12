import { Component ,ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { map } from 'rxjs/operators';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ProductShort, AppearanceVariant } from '../model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit   {

  product$: Observable<ProductShort>;
  selectedAppearanceVariant$ = new BehaviorSubject<AppearanceVariant>({}) ;
  selectedIndex: number;
  offSetNumber: number;
  isImageReady: boolean;
  isRightChange: boolean;
  indexArray = [];
  anchors: Element;
  @ViewChild(CdkScrollable, {static : true}) scrollable: CdkScrollable;

  constructor(private route: ActivatedRoute, private scroll: ScrollDispatcher) { }


  ngOnInit() {
    this.selectedIndex = 0;
    this.isImageReady = true;
    this.product$ =   this.route.data.pipe(map(data => data.product))

  }


  getIndex(scroll: number, clientWidth: number) {
    return Math.round(scroll / clientWidth);
  }
  setAppearanceVariant(appearanceVariant :AppearanceVariant ) {
    this.selectedAppearanceVariant$.next(appearanceVariant);
  }
  centerImage(index: number) {
    // this.anchors.scroll({behavior: 'smooth', left: this.anchors.clientWidth * index});
  }
  updateIndex(index: number) {
    this.selectedIndex  = index;
    this.centerImage(index);
  }

  stepUpdateImage(step) {
    const imagesNumber = this.indexArray.length;
    let _index = this.selectedIndex + step;
    if ( _index >= imagesNumber  ) {
      _index = 0;
    }
    if ( _index < 0  ) {
      _index = imagesNumber - 1;
    }
    this.updateIndex(_index);
  }

}
