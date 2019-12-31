import { Injectable, Inject } from '@angular/core';
import { CategoryCacheService } from './category-cache.service';
import { tap } from 'rxjs/operators';
import { ProductDataService, API_URL } from './product-data.service';
import { Category, ProductCollection, FilterCategory } from '../model';
import { CollectionCacheService } from './collection-cache.service';
import { FilterCacheService } from './filter-cache.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  categories: Category[] ;
  collections: ProductCollection[];
  productFilters: FilterCategory[];
  icons: any;
  constructor( private pds: ProductDataService , private _collectionCache: CollectionCacheService,
               private _categoryCache: CategoryCacheService,
               @Inject(API_URL) private apiUrl: string,
               private _filterCache:  FilterCacheService,
               private iconRegistry: MatIconRegistry , private sanitizer: DomSanitizer) { }

  getCategories(): Promise<object> {
    return    this.pds.get_elements({model: 'categorie'}).pipe(
      tap(jsonItems => {
        this._categoryCache.categories = jsonItems;
      }))
      .toPromise().then(
        () => this.getCollections().then(
          () => this.getFilters().then(
            () => this.loadIconRegistry()
          )

      ));
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

  loadIconRegistry(): Promise<object> {
    return    this.pds.get_elements({model: 'icon'}).pipe(
      tap(jsonItems => {
        jsonItems.forEach(jsonItem => {
          const safeRessource = this.sanitizer.bypassSecurityTrustResourceUrl(jsonItem.content);
          this.iconRegistry.addSvgIcon(jsonItem.designation, safeRessource);
        });


      }))
      .toPromise();
  }

  // loadInitials() : Promise<Object> {
  //   const query: string = [
  //     this.apiUrl,
  //     '/init',].join('') ;

  // }


}
