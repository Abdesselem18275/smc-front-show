import { Component, OnInit, EventEmitter } from '@angular/core';
import { ProductShort } from '../model';
import { ProductDataService } from '../service/product-data.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, mergeAll } from 'rxjs/operators';
import { PageEvent } from '@angular/material';
import { Observable, Subject, merge } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productShorts: ProductShort[];
  CurrentParam: String;
  objCount: number;
  paramRequest = new Subject<any>();
  constructor(private route: ActivatedRoute, private pds: ProductDataService) { }
  ngOnInit() {
       merge(this.paramRequest,
        this.route
       .queryParamMap
       .pipe(map(params => params.get('category') || ''),
         map(category =>  new Map([['categories__designation__in', category]])  ))).pipe(
         switchMap(param => this.pds.get_elements({model: 'product', param_key: param})))
       .subscribe(_products => {
              this.productShorts = _products['results'];
              this.objCount  = _products['count'];});
      // merge(this.paramRequest,
      //   this.route
      //  .queryParamMap
      //  .pipe(map(params => params.get('category') || ''),
      //    map(category => '?categories__designation__in='.concat(category)))).
      //   subscribe(_products => {
      //         console.warn(_products);  });

}

getRequest(event: any) {
  this.paramRequest.next(event);

  // event = '?'.concat(event);
  // event = event.concat(this.CurrentParam.replace('?', '&'));
  // this.pds.get_elements({model: 'product', param_key: event})
  //             .subscribe(products => this.productShorts = products['results']);
                      }

pageEvent(event: PageEvent) {
}

}
