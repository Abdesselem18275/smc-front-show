import { Injectable } from '@angular/core';
import { CategoryCacheService } from './category-cache.service';
import { tap } from 'rxjs/operators';
import { ProductDataService } from './product-data.service';
import { Category, ProductCollection, FilterCategory } from '../model';
import { CollectionCacheService } from './collection-cache.service';
import { FilterCacheService } from './filter-cache.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  categories: Category[] ;
  collections: ProductCollection[];
  productFilters: FilterCategory[];
  constructor(private pds: ProductDataService , private _collectionCache: CollectionCacheService
              , private _categoryCache: CategoryCacheService,
               private _filterCache:  FilterCacheService) { }

  getCategories(): Promise<object> {
    return    this.pds.get_elements({model: 'categorie'}).pipe(
      tap(jsonItems => {
        this._categoryCache.categories = jsonItems;
      }))
      .toPromise();
  }
  getCollections(): Promise<object> {
    return    this.pds.get_elements({model: 'collection'}).pipe(
      tap(jsonItems => {
        this._collectionCache.collections = jsonItems;
      }))
      .toPromise();
  }
  getFilters(): Promise<object> {
    return    this.pds.get_elements({model: 'filter'}).pipe(
      tap(jsonItems => {
        this._filterCache.filterCategories = jsonItems;
      }))
      .toPromise();
  }
}
