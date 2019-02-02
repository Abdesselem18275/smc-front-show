import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductShort } from '../model';
import { ProductDataService } from '../service/product-data.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productShorts$: Observable<ProductShort[]>;
  isGrid: boolean;
  currentClasses: {};
  constructor(private pds: ProductDataService) { }
  ngOnInit() {
  this.isGrid = true;
  this.setCurrentClasses(true);
  this.pds.get_elements({model: 'product'}).pipe(
    products => this.productShorts$ = products
  );
}

getRequest(event) {
  this.pds.get_elements({model: 'product', param_key: event}).pipe(
    products => this.productShorts$ = products);
}
gridToggle() {
  this.isGrid = true;

}
listToggle() {
  this.isGrid = false;
}
setCurrentClasses(state) {
  this.isGrid = state;
  this.currentClasses =  {
    'content__image-container--grid': this.isGrid,
    'content__image-container--list': !this.isGrid,
  };
}

}
