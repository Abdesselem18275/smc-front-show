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
  constructor(private pds: ProductDataService) { }
  ngOnInit() {
  this.pds.get_elements({model: 'product'}).pipe(
    products => this.productShorts$ = products
  );
}

}
