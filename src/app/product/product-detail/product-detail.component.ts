import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { map, throttleTime, distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent    {

  // product: ProductShort;
  // selectedVariant: Variant;
  // selectedIndex: number;
  // offSetNumber: number;
  // isReady: boolean;
  // isImageReady: boolean;
  // isRightChange: boolean;
  // indexArray = [];
  // anchors: Element;
  // @ViewChild(CdkScrollable, {static : true}) scrollable: CdkScrollable;

  // displayedColumns: string[] = ['Reference', 'Height', 'Capacity', 'Thickness', 'Diameter'];
  // componnentDisplayedColumns: string[] = ['Componnent' , 'Measure', 'Material'];

  // constructor(private route: ActivatedRoute, private scroll: ScrollDispatcher) { }


  // ngOnInit() {
  //   this.selectedIndex = 0;
  //   this.isReady = false;
  //   this.isImageReady = true;
  //     this.route.data.subscribe((data: { product: ProductShort }) => {
  //       this.product = data.product;
  //       this.indexArray = this.product.images.map((x, index) => ({
  //         id: x.id,
  //         index: index
  //       })) ;

  //       this.isReady = true;

  //     });

  // }
  // ngAfterViewInit() {
  //   this.anchors = this.scrollable.getElementRef().nativeElement;
  //   this.scrollable.elementScrolled().pipe(debounceTime(200)).subscribe(() => {
  //     this.selectedIndex  = this.getIndex(this.anchors.scrollLeft, this.anchors.clientWidth);
  //   });
  // }
 
  // getIndex(scroll: number, clientWidth: number) {
  //   return Math.round(scroll / clientWidth);
  // }

  // centerImage(index: number) {
  //   this.anchors.scroll({behavior: 'smooth', left: this.anchors.clientWidth * index});
  // }
  // updateIndex(index: number) {
  //   this.selectedIndex  = index;
  //   this.centerImage(index);
  // }

  // stepUpdateImage(step) {
  //   const imagesNumber = this.indexArray.length;
  //   let _index = this.selectedIndex + step;
  //   if ( _index >= imagesNumber  ) {
  //     _index = 0;
  //   }
  //   if ( _index < 0  ) {
  //     _index = imagesNumber - 1;
  //   }
  //   this.updateIndex(_index);

  // }

}
