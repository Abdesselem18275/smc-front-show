import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewEncapsulation} from '@angular/core';
import { ProductShort } from '../model';

@Component({
  selector: 'app-product-list-composit',
  templateUrl: './product-list-composit.component.html',
  styleUrls: ['./product-list-composit.component.scss'],
})
export class ProductListCompositComponent implements OnChanges, OnInit {
@Input() productShort: ProductShort;
mainImageUrl: string;
  constructor() { }

  ngOnChanges() {
  }

  ngOnInit() {
  }

}
