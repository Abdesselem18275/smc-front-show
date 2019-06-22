import { Injectable } from '@angular/core';
import { ProductCollection } from '../model';
import { ProductDataService } from './product-data.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionCacheService {
  _collections: ProductCollection[];
  constructor(private pds: ProductDataService) {}

  fetchCachedCollections() {
    if (!this._collections) {
      this.pds.get_elements({model: 'collection'}).subscribe(
        jsonItems => {
          this._collections = jsonItems;
        });
    }
    return this._collections;
  }

  set collections(collections) {
    this._collections = collections;
  }

}
