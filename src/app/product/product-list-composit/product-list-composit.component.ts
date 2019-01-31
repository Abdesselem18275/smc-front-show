import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ProductShort } from '../model';
import { ProductDataService } from '../service/product-data.service';

@Component({
  selector: 'app-product-list-composit',
  templateUrl: './product-list-composit.component.html',
  styleUrls: ['./product-list-composit.component.scss']
})
export class ProductListCompositComponent implements OnInit {
@Input() productShort: ProductShort;
mainImageUrl: string;
isDetail: Boolean;
displayedColumns: string[] = ['reference', 'height', 'width', 'capacity'];
  constructor() { }

  ngOnInit() {
    this.isDetail = false;
  }
  toggle() {
    this.isDetail = !this.isDetail;
  }

}
