import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ProductShort } from '../model';
import { ProductDataService } from '../service/product-data.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, mergeAll } from 'rxjs/operators';
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
  @ViewChild(MatPaginator) paginator: MatPaginator;



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
              if (this.objCount  !== _products['count']) {
                 this.paginator.firstPage();
              }
              this.objCount  = _products['count'];
            });

}

getRequest(event: any) {
  this.paramRequest.next(event);
                      }

pageEvent(event: PageEvent) {
  this.pageIndex = event.pageIndex === 0 ? 1 : event.previousPageIndex === 0 ? 2 : event.pageIndex;

  this.paramRequest.next(new Map().set('page', this.pageIndex));

}

}
