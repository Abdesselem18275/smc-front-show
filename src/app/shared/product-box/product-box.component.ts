import { Component, OnInit, Input } from '@angular/core';
import { ProductShort } from 'src/app/product/model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss']
})
export class ProductBoxComponent implements OnInit {
  @Input() product: ProductShort;
  constructor() { }

  ngOnInit() {
  }

}
