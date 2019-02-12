import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductShort } from '../model';
import { ProductDataService } from '../service/product-data.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productShorts$: Observable<ProductShort[]>;
  CurrentParam: String;
  constructor(private route: ActivatedRoute, private pds: ProductDataService) { }
  ngOnInit() {


    this.route
      .queryParamMap
      .pipe(map(params => params.get('category') || ''),
        map(category => '?categories__designation__in='.concat(category)))
      .subscribe(param => {
        this.CurrentParam = param;
        this.pds.get_elements({model: 'product', param_key: param})
          .pipe(products => this.productShorts$ = products);

      });
}

getRequest(event: string) {
  event = '?'.concat(event);
  event = event.concat(this.CurrentParam.replace('?', '&'));
  this.pds.get_elements({model: 'product', param_key: event})
                       .pipe(products => this.productShorts$ = products);
}

}
