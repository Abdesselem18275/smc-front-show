import { Component, OnInit} from '@angular/core';
import { ProductShort } from '../model';
import { ProductDataService } from '../service/product-data.service';
import { ActivatedRoute} from '@angular/router';
import { map, switchMap, tap, reduce, windowTime, mergeAll } from 'rxjs/operators';
import { Subject, merge } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productShorts: ProductShort[];
  objCount: number;
  isReady: boolean;
  isFilterActive: boolean;
  isListActive: boolean;
  paramRequest = new Subject<any>();
  resetFilter: boolean;
  pageNumber: number;
  constructor(private route: ActivatedRoute, private pds: ProductDataService) { }
  ngOnInit() {
    this.pageNumber = 1;
    this.isFilterActive = false;
    merge(this.paramRequest,
     this.route.queryParamMap.pipe(
                                   tap(() => {
                                              this.resetFilter = !this.resetFilter;
                                              this.pds.resetHttpParams();
                                            }),
                                   map(params => {
                                      let paramsMap = new Map();
                                      params.keys.forEach(key => {
                                      paramsMap.set(key, params.get(key)); });
                                      return paramsMap; }),
                                      ))
    .pipe(
      windowTime(500),
      map(win => win.pipe(
        reduce((acc, one) => {
        if (one !== undefined && acc !== undefined  ) {
          one.forEach((value, key) => {
            acc.set(key, value);
          });
      }
        return acc;
      }))),
      mergeAll(),
      tap((x) => {
                 console.warn(x);
                 this.isReady = false;
      }),
      switchMap(param => this.pds.get_elements({model: 'product', param_key: param})))
    .subscribe(_products => {
           this.productShorts = this.pageNumber === 1 || this.pageNumber === undefined ?
           _products['results'] : this.productShorts.concat(_products['results']) ;
           this.objCount  = _products['count'];
           this.isReady = true;
         });
}

mergeParam(param: Map<any, any>) {
  this.paramRequest.next(param);
}
filterEvent(param) {
  this.objCount = 1;
  this.pageNumber = 1;
  this.mergeParam(param);
}

pageEvent(pageNumber) {
  this.pageNumber = pageNumber;
  this.mergeParam(new Map().set('page', pageNumber ));

}
filterToggle() {
  this.isFilterActive = !this.isFilterActive;
}

toggleView(event) {
  this.isListActive = !event.value;
}

}
