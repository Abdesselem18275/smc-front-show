import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { ProductShort } from 'src/app/product/model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss']
})
export class ProductBoxComponent implements OnInit  {
  @Input() product: ProductShort;
  @Input() mode: string;
  @ViewChild('img', {static: false}) img ;
  isLoading: boolean;
  constructor() { }

  ngOnInit() {
    this.isLoading = true;
  }

  onImageLoad(evt) {
  }


}
