import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Product } from 'src/app/models/product.models';

@Component({
  selector: 'app-product-materials',
  changeDetection : ChangeDetectionStrategy.OnPush,
  templateUrl: './product-materials.component.html'
})
export class ProductMaterialsComponent  {
  @Input() product!: Product;
  constructor() { }
}
