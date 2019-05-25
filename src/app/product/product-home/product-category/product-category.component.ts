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
      state('in', style({
        opacity : '1'
      })),
      state('out', style({
        opacity : '0'
      })),
      transition('in => out', [
        animate('0.1s', style({
          opacity : '0'
        }))
      ]),
      transition('out => in', [
        animate('0.1s', style({
          opacity : '1'
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
  constructor(private pds: ProductDataService) { }

  ngOnInit() {
    this.selectedIndex = 0;
    this.hoveredDescription = '-';
    this.collections = this.pds.getCollections();
    this.imagesNumber = this.collections.length;
  }
  toggleCollection(i) {
    this.selectedIndex = i ;
    this.hoveredDescription = i === -1 ? '-' : this.collections[i].description;
  }
  stepUpdateImage(step) {
    this.selectedIndex = this.selectedIndex + step;
    if ( this.selectedIndex >= this.imagesNumber  ) {
      this.selectedIndex = 0;
    }
    if ( this.selectedIndex < 0  ) {
      this.selectedIndex = this.imagesNumber - 1;
    }
    this.toggleCollection(this.selectedIndex);
  }
  counter() {

    return new Array(this.imagesNumber);
  }
}
