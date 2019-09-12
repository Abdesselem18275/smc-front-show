import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProductDataService } from '../service/product-data.service';
import { ProductShort } from '../model';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  searchBar = new FormControl('');
  products: ProductShort[];
  isReady: boolean;

  constructor(private pds: ProductDataService) { }
  ngOnInit() {
    this.isReady = true;

  this.searchBar.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()).
      subscribe(term => {
        this.isReady = false;
        const myMap = new Map<string, string>().set('search', term);
        this.pds.get_elements({model: 'product', param_key: myMap}).subscribe(results => {
          this.products = results['results'];
          this.isReady = true;
        });
      });
}
}
