import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { ProductDataService } from '../service/product-data.service';
import { ProductShort } from '../model';
import { Router} from '@angular/router';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  searchBar = new FormControl('');
  products: ProductShort[];
  objCount: number;
  isReady: boolean;

  constructor(private router: Router , private pds: ProductDataService) { }
  ngOnInit() {
    this.isReady = true;

  this.searchBar.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter(term => term !== '')).
      subscribe(term => {
        this.isReady = false;
        const myMap =  new Map<string, string>().set('search', term);
        this.pds.resetHttpParams();
        this.pds.get_elements({model: 'product', param_key: myMap}).subscribe(results => {
          this.products = results['results'];
          this.objCount  = results['count'];
          this.isReady = true;
        });
      });
}


closePopup() {
  this.router.navigate([{ outlets: { popup: null }}]);
}
pageEvent(pageNumber) {
  console.warn(pageNumber);

}
}
