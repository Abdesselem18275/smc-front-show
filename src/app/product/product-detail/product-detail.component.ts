import { Component ,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ProductShort, AppearanceVariant } from '../model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent    {

  product$: Observable<ProductShort>;
  selectedAppearanceVariant$ = new Subject<AppearanceVariant>() ;

  selectedIndex: number;
  offSetNumber: number;
  isReady: boolean;
  isImageReady: boolean;
  isRightChange: boolean;
  indexArray = [];
  anchors: Element;
  @ViewChild(CdkScrollable, {static : true}) scrollable: CdkScrollable;

  displayedColumns: string[] = ['Reference', 'Height', 'Capacity', 'Thickness', 'Diameter'];
  componnentDisplayedColumns: string[] = ['Componnent' , 'Measure', 'Material'];

  constructor(private route: ActivatedRoute, private scroll: ScrollDispatcher) { }


  ngOnInit() {
    this.selectedIndex = 0;
    this.isReady = false;
    this.isImageReady = true;
    this.product$ =   this.route.data.pipe(map(data => data.product))
  }
  ngAfterViewInit() {
    // this.anchors = this.scrollable.getElementRef().nativeElement;
    // this.scrollable.elementScrolled().pipe(debounceTime(200)).subscribe(() => {
    //   this.selectedIndex  = this.getIndex(this.anchors.scrollLeft, this.anchors.clientWidth);
    // });
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
