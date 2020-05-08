import { Component, OnInit } from '@angular/core';
import { ProductCollection } from '../../model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CollectionCacheService } from '../../service/collection-cache.service';

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
  selectedCollection: ProductCollection;
  selectedIndex: number;
  hoveredDescription: string;
  imagesNumber: number;
  selectedImage: string;
  isImageReady: boolean;
  isRightChange: boolean;
  constructor(private collectionCache: CollectionCacheService) { }

  ngOnInit() {
    this.selectedIndex = 0;
    this.collections = this.collectionCache.fetchCachedCollections();
    this.imagesNumber = this.collections.length;
    this.toggleCollection(0);
    this.updateImage(this.selectedIndex);

  }


  toggleCollection(i) {
    this.selectedIndex = i ;
    this.selectedCollection = this.collections[i];
  }

  updateImage(index) {
    this.isImageReady = false;
    this.selectedIndex = index;
    setTimeout(() => {
      this.isImageReady = true;
      this.hoveredDescription = index === -1 ? '-' : this.collections[index].description;
      this.selectedImage = index === -1 ? '' : this.collections[index].thumbNail?.content;
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
    this.toggleCollection(_index);
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
