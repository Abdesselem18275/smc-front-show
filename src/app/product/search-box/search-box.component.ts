import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, tap, map } from 'rxjs/operators';
import { ProductDataService } from '../service/product-data.service';
import { ProductShort } from '../model';
import { Router} from '@angular/router';
import { Subject, merge } from 'rxjs';
import { ModalHandlerService } from 'src/app/shared/service/modal-handler.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  searchBar = new FormControl('');
  searchTerm: string;
  products: ProductShort[];
  objCount: number;
  isReady: boolean;
  pageNumber: number;
  paramRequest = new Subject<any>();


  constructor(private modalHandlerService: ModalHandlerService, private pds: ProductDataService) { }
  ngOnInit() {
    this.isReady = true;
  merge(this.paramRequest,
  this.searchBar.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(term => {
        this.pds.resetHttpParams();
        this.searchTerm = term;

      }),
      filter((term: string) => term !== '' && term.length > 2),
      map(term => new Map<string, string>().set('search', term),
      ))).
      subscribe(param => {
        this.isReady = false;
        this.pds.get_elements({model: 'product', param_key: param}).subscribe(results => {
          this.products = this.pageNumber === 1 || this.pageNumber === undefined ?
          results['results'] : this.products.concat(results['results']) ;
          this.objCount  = results['count'];
          this.isReady = true;
        });
      });
}


closePopup() {
    this.modalHandlerService.closeAll();
}
pageEvent(pageNumber) {
  this.pageNumber  = pageNumber;
  this.paramRequest.next(new Map().set('page', pageNumber ));

}
}
