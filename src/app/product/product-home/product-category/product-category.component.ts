import { Component, OnInit } from '@angular/core';
import { ProductCollection } from '../../model';
import { ProductDataService } from '../../service/product-data.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
  animations: [
    trigger('imageChangeTrigger', [
      state('outLeft', style({
        opacity : '0'
      })),
      state('in', style({
        opacity : '1'
      })),
      state('outRight', style({
        opacity : '0'
      })),
      transition('* => outRight', [
        animate('0.1s ease-out', style({
          transform : 'translateX(100%)'

        }))
      ]),
      transition('* => outLeft', [
        animate('0.1s ease-out', style({
          transform : 'translateX(-150%)'

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
export class ProductCategoryComponent implements OnInit {
  collections: ProductCollection[];
  selectedIndex: number;
  hoveredDescription: string;
  imagesNumber: number;
  selectedImage: string;
  isReady: boolean;
  isImageReady: boolean;
  isRightChange: boolean;
  constructor(private pds: ProductDataService) { }

  ngOnInit() {
    this.isReady = false;
    this.selectedIndex = 0;
    this.hoveredDescription = '-';

    this.pds.get_elements({model: 'collection'}).subscribe(_collections => {
      this.collections = _collections;
      this.imagesNumber = this.collections.length;
      this.isReady = true;
      this.updateImage(this.selectedIndex);
     });
  }


  toggleCollection(i) {
    this.selectedIndex = i ;
    this.hoveredDescription = i === -1 ? '-' : this.collections[i].description;
  }

  updateImage(index) {
    this.isImageReady = false;
    console.warn(this.getState(), this.isRightChange, this.isImageReady);
    this.selectedIndex = index;
    setTimeout(() => {
      this.isImageReady = true;
      this.hoveredDescription = index === -1 ? '-' : this.collections[index].description;
      this.selectedImage = index === -1 ? '' : this.collections[index].thumbNail.content;
      console.warn(this.getState(), this.isRightChange, this.isImageReady);
    }, 110);
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
  counter() {

    return new Array(this.imagesNumber);
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
}
