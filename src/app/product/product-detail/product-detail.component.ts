import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductLong, Variant } from '../model';

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

  constructor(private route: ActivatedRoute) { }


  ngOnInit() {
    this.selectedIndex = 0;
    this.isReady = false;
    this.isImageReady = true;
      this.route.data.subscribe((data: { product: ProductLong }) => {
        console.warn(data.product);
        this.product = new ProductLong(data.product);
        this.indexArray = this.product.images.map((x, index) => ({
          id: x.id,
          index: index
        })) ;
        console.warn(this.product);
        console.warn(this.indexArray);
        this.isReady = true;
      });

  }

  ngAfterViewChecked(): void {
  }

  centerImage(index: number) {
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

}
