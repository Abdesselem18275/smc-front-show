import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ProductShort } from 'src/app/product/model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss']
})
export class ProductBoxComponent implements OnInit , OnChanges {
  @Input() product: ProductShort;
  @Input() mode: string;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    console.warn(this.mode);
  }

}
