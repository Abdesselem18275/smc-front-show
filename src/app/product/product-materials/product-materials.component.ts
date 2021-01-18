import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Product } from 'src/app/core/types';

@Component({
  selector: 'app-product-materials',
  changeDetection : ChangeDetectionStrategy.OnPush,
  templateUrl: './product-materials.component.html'
})
export class ProductMaterialsComponent  {
  @Input() product!: Product;
  constructor() { }
}
