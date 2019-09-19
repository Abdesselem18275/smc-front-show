import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductShort } from '../model';
import { ProductDataService } from '../service/product-data.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap, debounceTime } from 'rxjs/operators';
import { Subject, merge } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productShorts: ProductShort[];
  CurrentParam: String;
  objCount: number;
  pageIndex: number;
  paramRequest = new Subject<any>();
  isReady: boolean;
  isFilterActive: boolean;
  isListActive: boolean;
  reqNumber: number;



  constructor(private sanitizer: DomSanitizer , private route: ActivatedRoute, private pds: ProductDataService) { }
  ngOnInit() {
       this.reqNumber = 0;
       this.isFilterActive = false;

       merge(this.paramRequest,
        this.route
       .queryParamMap
       .pipe(map(params => {
            // tslint:disable-next-line:prefer-const
            let paramsMap = new Map();
            params.keys.forEach(key => {
              paramsMap.set(key, params.get(key)); });
            return paramsMap;
       }))).pipe(
         tap(() => this.isReady = false),
         debounceTime(500),
         switchMap(param => this.pds.get_elements({model: 'product', param_key: param})))
       .subscribe(_products => {
              this.productShorts = _products['results'];
              this.objCount  = _products['count'];
              this.isReady = true;
            });
}

getRequest(event: Map<any, any>) {
  this.paramRequest.next(event);
  let i = 0;
  for (let key of event.keys()) {
    i = event.get(key) !== '' ? i + 1 : i;
  }
  this.reqNumber = i;

}

pageEvent(pageNumber) {
  console.warn('pageNumber event ' + pageNumber);
  this.paramRequest.next(new Map().set('page', pageNumber));
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
