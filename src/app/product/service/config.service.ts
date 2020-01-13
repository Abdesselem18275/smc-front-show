import { Injectable, Inject, InjectionToken } from '@angular/core';
import { CategoryCacheService } from './category-cache.service';
import { tap } from 'rxjs/operators';
import { API_URL } from './product-data.service';
import { Category, ProductCollection, FilterCategory } from '../model';
import { CollectionCacheService } from './collection-cache.service';
import { FilterCacheService } from './filter-cache.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { UserLanguage, LanguageType } from 'src/app/root-store/global-store/state';

export const LANGUAGE_LIST: UserLanguage[] = [
  {
    id: 'Fr',
    LanguageType: LanguageType.FRENCH
  }, 
  {
    id: 'En',
    LanguageType: LanguageType.ENGLISH

  }, {
    id: 'Gr',
    LanguageType: LanguageType.GERMAN 
  }
]

export const LANGUAGE_CONFIG = new InjectionToken<UserLanguage[]>('config.service');

export function loadInitData(configService: ConfigService) {
  return () => configService.loadInitials();
}

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
    return this.http.get(query).pipe(tap(jsonsItems => {
      this._categoryCache.categories = jsonsItems['categories'];
      this._filterCache.filterCategories = jsonsItems['filters'];
      this._collectionCache.collections = jsonsItems['collections'];
      jsonsItems['icons'].forEach(jsonItem => {
        console.warn(jsonItem.content);
        const safeRessource = this.sanitizer.bypassSecurityTrustResourceUrl(jsonItem.content);
        this.iconRegistry.addSvgIcon(jsonItem.designation, safeRessource);
      });
    })).toPromise();

  }


}
