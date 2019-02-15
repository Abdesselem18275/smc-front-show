import { Component, OnInit, EventEmitter } from '@angular/core';
import { ProductShort } from '../model';
import { ProductDataService } from '../service/product-data.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, mergeAll } from 'rxjs/operators';
import { PageEvent } from '@angular/material';
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
  paramRequest = new Subject<any>();
  isReady: boolean;
  constructor(private route: ActivatedRoute, private pds: ProductDataService) { }
  ngOnInit() {
       this.isReady = false;
       merge(this.paramRequest,
        this.route
       .queryParamMap
       .pipe(map(params => params.get('category') || ''),
         map(category =>  new Map([['categories__designation__in', category]])  ))).pipe(
         switchMap(param => this.pds.get_elements({model: 'product', param_key: param})))
       .subscribe(_products => {
              this.productShorts = _products['results'];
              this.objCount  = _products['count']; });
              this.isReady = true;

}

getRequest(event: any) {
  this.paramRequest.next(event);
                      }

pageEvent(event: PageEvent) {
  console.warn('page index ' + event.pageIndex);
  console.warn('length  ' + event.length);
  this.paramRequest.next(new Map().set('page', event.pageIndex));

}

}
