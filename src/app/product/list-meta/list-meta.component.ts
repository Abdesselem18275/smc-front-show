import { Component, Inject } from '@angular/core';
import { ProductStoreSelectors } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { UserStoreSelectors } from 'src/app/root-store/user-store';
import { GlobalStoreSelectors } from 'src/app/root-store/global-store';
import { QUERY_PARAM_KEYS } from 'src/app/injectables';
import { Category } from 'src/app/core/types';

@Component({
  selector: 'app-list-meta',
  templateUrl: './list-meta.component.html',
  styleUrls: ['./list-meta.component.scss']
})
export class ListMetaComponent  {
  objCount$: Observable<number>;
  isLoading$: Observable<boolean>;
  isSearchActive$: Observable<boolean>;
  isFavoriteActive$: Observable<boolean>;
  searchTerm$: Observable<string>;
  favoritesCount$: Observable<number>;
  activeCategory$: Observable<Category>;

  constructor(
    private route: ActivatedRoute,
    @Inject(QUERY_PARAM_KEYS) private queryParamKeys: any,
    private store$: Store<any> ) {
      this.objCount$ = this.store$.select(ProductStoreSelectors.selectProductsCount);
      this.isLoading$ = this.store$.select(ProductStoreSelectors.selectIsLoading);
      this.isSearchActive$ = this.route.queryParamMap.pipe(
       map(paramMap => paramMap.has(this.queryParamKeys.SEARCH)));
       this.isFavoriteActive$ =   this.route.url.pipe(
         map((urls: UrlSegment[]) => urls.toString().includes('favorites'))
       );
      this.activeCategory$ = this.route.queryParamMap.pipe(
        map(paramMap => paramMap.get(this.queryParamKeys.CAT_DESIGNATION)),
        withLatestFrom(this.store$.select(GlobalStoreSelectors.selectCategories)),
        map(([value,categories]: [string,Category[]])=> value !== '' && value ?
        categories.filter(cat => cat.designation === value).shift():
        {
          designation : 'All Cateogries',
          isRoot: true,
          children : categories.filter(cat => cat.isRoot)
        })
      );
      this.searchTerm$ = this.route.queryParamMap.pipe(
        map(paramMap => paramMap.get(this.queryParamKeys.SEARCH)));
      this.favoritesCount$ = this.store$.select(UserStoreSelectors.selectFavoritesCount);
    }




}
