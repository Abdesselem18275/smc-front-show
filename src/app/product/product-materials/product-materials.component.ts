import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ProductShort } from '../model';

@Component({
  selector: 'app-product-materials',
  changeDetection : ChangeDetectionStrategy.OnPush,
  templateUrl: './product-materials.component.html'
})
export class ProductMaterialsComponent  {
  @Input() product : ProductShort;
  constructor() { }
}
