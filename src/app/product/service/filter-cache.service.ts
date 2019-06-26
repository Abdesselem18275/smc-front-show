import { Injectable } from '@angular/core';
import { FilterCategory } from '../model';
import { ProductDataService } from './product-data.service';

@Injectable({
  providedIn: 'root'
})
export class FilterCacheService {
  _filterCategory: FilterCategory[];
  constructor(private pds: ProductDataService) {}

  fetchCachedFilter() {
    if (!this._filterCategory) {
      this.pds.get_elements({model: 'filter'}).subscribe(
        jsonItems => {
          this._filterCategory = jsonItems;
        });
    }
    return this._filterCategory;
  }

  set filterCategories(filterCategory) {
    this._filterCategory = filterCategory;
  }

}
