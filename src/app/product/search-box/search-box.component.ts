import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, tap, map, switchMap } from 'rxjs/operators';
import { ProductDataService } from '../service/product-data.service';
import { ProductShort } from '../model';
import { Subject } from 'rxjs';
import { ModalHandlerService } from 'src/app/shared/service/modal-handler.service';
import { ParamStoreService } from '../service/param-store.service';
import { PramAction } from '../action';

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


  constructor(private modalHandlerService: ModalHandlerService,
              private paramStoreService: ParamStoreService,
              private pds: ProductDataService) { }
  ngOnInit() {
  this.isReady = true;
  this.searchBar.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(term => {
        this.searchTerm = term;
      }),
      filter((term: string) => term !== '' && term.length > 2),
      map(term => new Map<string, string>().set('search', term))).subscribe(param => {
        this.paramStoreService.dispatch(
          new PramAction(
            'SEARCH',
            param));
      });
      // this.paramStoreService.paramStore$.pipe(switchMap(store =>
      //   this.pds.get_elements({model: 'product', param_key: store.page})
      //   )).subscribe(results => {
      //     this.isReady = false;
      //     this.products = this.pageNumber === 1 || this.pageNumber === undefined ?
      //     results['results'] : this.products.concat(results['results']) ;
      //     this.objCount  = results['count'];
      //     this.isReady = true;
      //   });
}


closePopup() {
    this.modalHandlerService.closeAll();
}
pageEvent(pageNumber) {
  this.pageNumber  = pageNumber;
  this.paramStoreService.dispatch(
    new PramAction(
      'page',
      new Map().set('page', pageNumber )));

}
}
