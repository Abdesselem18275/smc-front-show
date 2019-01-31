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
  selectedImage: string;
  isReady: boolean;
  constructor(private pds: ProductDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.isReady = false;
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.pds.get_element({value: params.get('id'), model: 'product'}))).
      subscribe((jsonItem: ProductLong) => {
        this.product = jsonItem;
        console.warn( this.product);
        this.selectedVariant = this.product.variants[0];
        console.warn(this.selectedVariant);
        this.selectedImage = this.product.images[0] === undefined ? this.product.thumbNail : this.product.images[0].content;
        this.isReady = true;
      });

  }
  updateVariant(event) {
    this.selectedVariant = this.product.variants.filter(x => x.id === event.value)[0];
  }
  updateImage(event) {
    this.selectedImage = event;
  }
}
