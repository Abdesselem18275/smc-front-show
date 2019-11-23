import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, Renderer2, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductDataService } from '../service/product-data.service';
import { ProductLong, Variant } from '../model';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit , AfterViewChecked   {
  product: ProductLong;
  selectedVariant: Variant;
  selectedIndex: number;
  offSetNumber: number;
  isReady: boolean;
  isImageReady: boolean;
  isRightChange: boolean;
  indexArray = [];

  displayedColumns: string[] = ['Reference', 'Height', 'Capacity', 'Thickness', 'Diameter'];
  componnentDisplayedColumns: string[] = ['Componnent' , 'Measure', 'Material'];

  constructor(private route: ActivatedRoute, private _renderer: Renderer2) { }


  ngOnInit() {
    this.selectedIndex = 0;
    this.isReady = false;
    this.isImageReady = true;
      this.route.data.subscribe((data: { product: ProductLong }) => {
        this.product = new ProductLong(data.product);
        this.indexArray = this.product.images === undefined ?  [] :
        this.product.images.map((x, index) => ({
          id: x.id,
          index: index})) ;
        this.isReady = true;
      });

  }

  ngAfterViewChecked(): void {
  }

  centerImage(index: number) {
    const el = this.indexArray.filter(x => x.index === index)[0];
    const anchors = document.getElementsByClassName('images-container')[0];
    anchors.scroll({behavior: 'smooth', left: anchors.clientWidth * index});
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


  private counter() {
    return new Array(this.product.images === undefined ? 1 : this.product.images.length);
  }

}
