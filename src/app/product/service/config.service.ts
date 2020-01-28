import { Injectable, Inject, InjectionToken } from '@angular/core';
import { CategoryCacheService } from './category-cache.service';
import { tap, catchError } from 'rxjs/operators';
import { Category, ProductCollection, FilterCategory } from '../model';
import { CollectionCacheService } from './collection-cache.service';
import { FilterCacheService } from './filter-cache.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserLanguage, LanguageType } from 'src/app/root-store/global-store/state';
import { API_URL } from 'src/app/injectables.service';



@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  categories: Category[] ;
  collections: ProductCollection[];
  productFilters: FilterCategory[];
  icons: any;
  constructor( private _collectionCache: CollectionCacheService,
               private _categoryCache: CategoryCacheService,
               private http: HttpClient,
               @Inject(API_URL) private apiUrl: string,
               private _filterCache:  FilterCacheService,
               private iconRegistry: MatIconRegistry ,
               private sanitizer: DomSanitizer) { }

  loadInitials(): Promise<Object> {
    const query: string = [
      this.apiUrl,
      '/initData'].join('') ;
    return this.http.get(query).pipe(
      catchError(err => {
        console.error('An error occurred:', err.error);
        return err;
      }),
      tap(jsonsItems => {
      this._categoryCache.categories = jsonsItems['categories'];
      this._filterCache.filterCategories = jsonsItems['filters'];
      this._collectionCache.collections = jsonsItems['collections'];
      jsonsItems['icons'].forEach(jsonItem => {
        const safeRessource = this.sanitizer.bypassSecurityTrustResourceUrl(jsonItem.content);
        this.iconRegistry.addSvgIcon(jsonItem.designation, safeRessource);
      });
    })).toPromise();

  }


}
