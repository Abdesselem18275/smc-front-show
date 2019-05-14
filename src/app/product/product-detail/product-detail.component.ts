import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductDataService } from '../service/product-data.service';
import { switchMap } from 'rxjs/operators';
import { ProductLong, Variant } from '../model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: ProductLong;
  selectedVariant: Variant;
  imagesNumber: number;
  selectedImage: string;
  selectedIndex: number;
  isReady: boolean;
  displayedColumns: string[] = ['Variant' , 'Height', 'Capacity', 'Thickness', 'Diameter'];
  constructor(private pds: ProductDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.selectedIndex = 0;
    this.isReady = false;
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.pds.get_element({value: params.get('id'), model: 'product'}))).
      subscribe((jsonItem: any) => {
        this.product = new ProductLong(jsonItem);
        console.warn(jsonItem);
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
    this.selectedIndex = index;
    this.selectedImage = this.product.images[this.selectedIndex].content;
  }
  stepUpdateImage(step) {
    this.selectedIndex = this.selectedIndex + step;
    if ( this.selectedIndex >= this.imagesNumber  ) {
      this.selectedIndex = 0;
    }
    if ( this.selectedIndex < 0  ) {
      this.selectedIndex = this.imagesNumber - 1;
    }
    this.selectedImage = this.product.images[this.selectedIndex].content;
  }
  counter() {

    return new Array(this.imagesNumber);
  }
}
