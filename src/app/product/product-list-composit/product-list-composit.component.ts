import { Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { ProductShort } from '../model';

@Component({
  selector: 'app-product-list-composit',
  templateUrl: './product-list-composit.component.html',
  styleUrls: ['./product-list-composit.component.scss']
})
export class ProductListCompositComponent implements OnChanges, OnInit {
@Input() productShort: ProductShort;
@Input() isGrid: boolean;
mainImageUrl: string;
isDetail: Boolean;
displayedColumns: string[] = ['reference', 'height', 'width', 'capacity'];
currentClasses: {};
imgClasses: {};
  constructor() { }

  ngOnChanges() {
    this.setCurrentClasses();
  }

  ngOnInit() {
    this.setCurrentClasses();
    this.isDetail = false;
  }
  toggle() {
    this.isDetail = !this.isDetail;
  }

  setCurrentClasses() {
    this.currentClasses =  {
      'box--grid': this.isGrid,
      'box--list': !this.isGrid,
    };
    this.imgClasses =  {
      'img-box--grid': this.isGrid,
      'img-box--list': !this.isGrid,
    };
  }

}
