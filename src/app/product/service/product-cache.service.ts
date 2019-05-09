import { Injectable } from '@angular/core';
import { ProductLong } from '../model';


@Injectable()
export class ProductCacheService {
  product: ProductLong;

  constructor() { }

  fetchCachedProduct(param: ProductLong) {
    if (param.pk !== this.product.pk || !this.product) {
       this.product = param;
    }
    return this.product;
  }
}
