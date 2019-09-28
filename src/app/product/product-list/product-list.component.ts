import { Component, OnInit} from '@angular/core';
import { ProductShort } from '../model';
import { ProductDataService } from '../service/product-data.service';
import { ActivatedRoute} from '@angular/router';
import { map, switchMap, tap, debounceTime, reduce, scan } from 'rxjs/operators';
import { Subject, merge } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productShorts: ProductShort[];
  CurrentParam: String;
  objCount: number;
  isReady: boolean;
  isFilterActive: boolean;
  isListActive: boolean;
  reqNumber: number;
  paramRequest = new Subject<any>();
  resetFilter: boolean;
  pageResetToggle: boolean;

  constructor(private route: ActivatedRoute, private pds: ProductDataService) { }
  ngOnInit() {
    this.reqNumber = 0;
    this.isFilterActive = false;
    merge(this.paramRequest,
     this.route.queryParamMap.pipe(
                                   tap(() => { this.resetFilter = !this.resetFilter;
                                               this.pds.resetHttpParams();
                                                }),
                                   map(params => {
                                      let paramsMap = new Map();
                                      params.keys.forEach(key => {
                                      paramsMap.set(key, params.get(key)); });
                                      return paramsMap; }),
                                      ))
    .pipe(
      scan((acc, one) => {
        if (one !== undefined && acc !== undefined  ) {
          one.forEach((value, key) => {
            acc.set(key, value);
          });
      }
        return acc;
      }),
      tap(() => this.isReady = false),
      debounceTime(500),
      switchMap(param => this.pds.get_elements({model: 'product', param_key: param})))
    .subscribe(_products => {
           this.productShorts = _products['results'];
           this.objCount  = _products['count'];
           this.isReady = true;
         });
}

mergeParam(param: Map<any, any>) {
  this.paramRequest.next(param);
}
filterEvent(param) {
  this.pageResetToggle = !this.pageResetToggle;
  this.mergeParam(param);
}

pageEvent(pageNumber) {
  this.mergeParam(new Map().set('page', pageNumber ));

}
filterToggle() {
  this.isFilterActive = !this.isFilterActive;
}

counter() {
  return new Array(10);

}
toggleView(event) {
  this.isListActive = !event.value;
}

}
