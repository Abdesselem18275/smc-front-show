import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductDataService } from '../service/product-data.service';
import { switchMap } from 'rxjs/operators';
import { ProductLong, Variant } from '../model';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
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
export class ProductDetailComponent implements OnInit {
  product: ProductLong;
  selectedVariant: Variant;
  imagesNumber: number;
  selectedImage: string;
  selectedIndex: number;
  isReady: boolean;
  isImageReady: boolean;
  displayedColumns: string[] = ['Variant' , 'Height', 'Capacity', 'Thickness', 'Diameter'];
  constructor(private pds: ProductDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.selectedIndex = 0;
    this.isReady = false;
    this.isImageReady = true;
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.pds.get_element({value: params.get('id'), model: 'product'}))).
      subscribe((jsonItem: any) => {
        console.warn(jsonItem);

        this.product = new ProductLong(jsonItem);
        this.imagesNumber = this.product.images === undefined ? 1 : this.product.images.length;
        this.selectedImage =
        this.product.images[0] === undefined ? this.product.thumbNail.content : this.product.images[0].content;
        this.isReady = true;
        console.warn(this.product);
      });

  }


  updateVariant(event) {
    this.selectedVariant = this.product.variants.filter(x => x.id === event.value)[0];
  }
  updateImage(index) {
    this.isImageReady = false;
    this.selectedIndex = index;
    setTimeout(() => {
      this.selectedImage = this.product.images[this.selectedIndex].content;
      this.isImageReady = true; }, 150);
  }
  stepUpdateImage(step) {
    this.selectedIndex = this.selectedIndex + step;
    if ( this.selectedIndex >= this.imagesNumber  ) {
      this.selectedIndex = 0;
    }
    if ( this.selectedIndex < 0  ) {
      this.selectedIndex = this.imagesNumber - 1;
    }
    this.updateImage(this.selectedIndex);
  }
  counter() {

    return new Array(this.imagesNumber);
  }
}
