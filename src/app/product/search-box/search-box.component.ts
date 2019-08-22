import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ProductDataService } from '../service/product-data.service';
import { stringify } from '@angular/compiler/src/util';
import { Observable } from 'rxjs';
import { ProductShort } from '../model';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  searchBar = new FormControl('');
  products: ProductShort[];

  constructor(private pds: ProductDataService) { }
  ngOnInit() {

  this.searchBar.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()).
      subscribe(term => {
        const myMap = new Map<string, string>().set('search', term);
        this.pds.get_elements({model: 'product', param_key: myMap}).subscribe(results => {
          this.products = results['results'];
          console.warn(this.products);
        });
      });
}
}
