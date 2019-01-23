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
isReady: Boolean;
displayedColumns: string[] = ['designation', 'height', 'width', 'capacity'];
  constructor(private pds: ProductDataService) { }

  ngOnInit() {
    console.warn(this.productShort);
    this.isDetail = false;
    this.isReady = false;
    this.pds.getSignedUrl(this.productShort.thumbNail).subscribe(signed => this.mainImageUrl = signed);
  }
  toggle() {
    this.isDetail = !this.isDetail;
  }

}
