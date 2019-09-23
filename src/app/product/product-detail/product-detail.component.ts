import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductDataService } from '../service/product-data.service';
import { ProductLong, Variant } from '../model';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  animations: [
    trigger('imageChangeTrigger', [
      state('outLeft', style({
        opacity : '0'
      })),
      state('in', style({
        opacity : '1',
      })),
      state('outRight', style({
        opacity : '0'
      })),
      transition('* => outRight', [
        animate('0.1s ease-out', style({
          transform : 'translateX(200%)',
          position : 'relative'

        }))
      ]),
      transition('* => outLeft', [
        animate('0.1s ease-out', style({
          transform : 'translateX(-100%)',
          position : 'relative'


        }))
      ]),
      transition('* => in', [
        animate('0.1s ease-out', style({
          transform : 'translateX(50%)'
        }))
      ]),
    ]),
  ],
})
export class ProductDetailComponent implements OnInit {
  product: ProductLong;
  selectedVariant: Variant;
  imagesNumber: number;
  selectedImage: string;
  selectedIndex: number;
  isReady: boolean;
  isImageReady: boolean;
  isRightChange: boolean;
  displayedColumns: string[] = ['Reference', 'Height', 'Capacity', 'Thickness', 'Diameter'];
  componnentDisplayedColumns: string[] = ['Componnent' , 'Measure', 'Material'];

  constructor(private pds: ProductDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.selectedIndex = 0;
    this.isReady = false;
    this.isImageReady = true;
      this.route.data.subscribe((data: { product: ProductLong }) => {
        this.product = new ProductLong(data.product);
        this.imagesNumber = this.product.images === undefined ? 1 : this.product.images.length;
        this.selectedImage =
        this.product.images[0] === undefined ? this.product.thumbNail.content : this.product.images[0].content;
        this.isReady = true;
      });

  }

  updateImage(index) {
    this.isImageReady = false;
    this.selectedIndex = index;
    setTimeout(() => {
      this.isImageReady = true;
      this.selectedImage = this.product.images[this.selectedIndex].content;
       }, 150);
  }
  stepUpdateImage(step) {
    this.isRightChange = step === -1 ? false : true;
    let _index = this.selectedIndex + step;
    if ( _index >= this.imagesNumber  ) {
      _index = 0;
    }
    if ( _index < 0  ) {
      _index = this.imagesNumber - 1;
    }
    this.updateImage(_index);
  }

  getState() {
    if (this.isImageReady) {

          return 'in';
    }  else {
      if (this.isRightChange) {
        return 'outRight';
      } else {
        return 'outLeft';
      }
    }
  }

  counter() {

    return new Array(this.imagesNumber);
  }
}
