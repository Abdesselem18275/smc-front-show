import { Component, OnInit, Input, OnChanges, ViewChild, SimpleChanges } from '@angular/core';
import { ProductShort } from 'src/app/product/model';


@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss']
})
export class ProductBoxComponent implements OnInit, OnChanges  {

  @Input() product: ProductShort;
  @Input() mode: string;
  isLoading: boolean;
  constructor() { }

  ngOnInit() {
    this.isLoading = true;
  }

  ngOnChanges(changes: SimpleChanges)  {
    this.isLoading  = true;

  }


  onImageLoad(evt) {
    this.isLoading  = false;

  }


}
