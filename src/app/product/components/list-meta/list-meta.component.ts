import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
 
import { map } from 'rxjs/operators';
import { ActivatedRoute, ParamMap,  } from '@angular/router';
import { QUERY_PARAM_KEYS } from 'src/app/injectables';
import { Category } from 'src/app/models/product.models';
import { GlobalStateService } from 'src/app/shared/state/global-state.service';
import { ProductStateService } from 'src/app/product/state/product-state.service';
import { AccountStateService } from 'src/app/shared/state/account-state.service';

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
    private pss :ProductStateService,
    private ass : AccountStateService,
    private gss : GlobalStateService,
    private route: ActivatedRoute,
    @Inject(QUERY_PARAM_KEYS) private queryParamKeys: any) {
      this.objCount$ = this.pss.productsCount
      this.isLoading$ = this.gss.isLoading
      this.isSearchActive$ = this.route.queryParamMap.pipe(
       map(paramMap => paramMap.has(this.queryParamKeys.SEARCH)));
       this.isFavoriteActive$ =   this.route.queryParamMap.pipe(
         map((paramMap: ParamMap) => paramMap.has('profiles'))
       );
      this.activeCategory$ = this.gss.activeCategory
      this.searchTerm$ = this.route.queryParamMap.pipe(
        map(paramMap => paramMap.get(this.queryParamKeys.SEARCH)));
      this.favoritesCount$ = this.ass.authProfile.pipe(map(profile => profile.favorites.length))
    }






}
