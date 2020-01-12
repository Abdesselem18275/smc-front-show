import { Injectable } from '@angular/core';
import { ProductDataService } from './product-data.service';
import { Category } from '../model';

@Injectable({
  providedIn: 'root'
})
export class CategoryCacheService {
  _categories: Category[];
  _sideMenuTree: Category[];
  constructor(private pds: ProductDataService) {}

  fetchCachedCategories() {
    // if (!this._categories) {
    //   this.pds.get_elements({model: 'categorie'}).subscribe(
    //     jsonItems => {
    //       this._categories = jsonItems;
    //     });
    // }
    return this._categories;
  }

  set categories(categories) {
    this._categories = categories;
  }


}
