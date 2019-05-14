import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ProductShort } from '../model';
import { ProductDataService } from '../service/product-data.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap, debounceTime } from 'rxjs/operators';
import { PageEvent, MatPaginator } from '@angular/material';
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
  pageIndex: number;
  paramRequest = new Subject<any>();
  isReady: boolean;
  isFilterActive: boolean;
  reqNumber: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;



  constructor(private route: ActivatedRoute, private pds: ProductDataService) { }
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
              if (this.objCount  !== _products['count']) {
                 this.paginator.firstPage();
              }
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

pageEvent(event: PageEvent) {
  this.pageIndex = event.pageIndex === 0 ? 1 : event.previousPageIndex === 0 ? 2 : event.pageIndex;
  this.paramRequest.next(new Map().set('page', this.pageIndex));

}
filterToggle() {
  this.isFilterActive = !this.isFilterActive;
}

}
