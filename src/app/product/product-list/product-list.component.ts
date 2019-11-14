import { Component, OnInit, OnDestroy} from '@angular/core';
import { ProductShort, ParamType } from '../model';
import { ActivatedRoute} from '@angular/router';
import { map} from 'rxjs/operators';
import { Store} from '@ngrx/store';
import { ParamStoreActions } from 'src/app/root-store/param-store';
import { ProductStoreSelectors } from 'src/app/root-store/product-store';

import { RootStoreState } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { selectIsLoading } from 'src/app/root-store/product-store/selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productShorts: Observable<ProductShort[]>;
  objCount: Observable<number>;
  isLoading: Observable<boolean>;
  isFilterActive: boolean;
  isListActive: boolean;
  resetFilter: boolean;
  filterCount: number;

  constructor(private route: ActivatedRoute,
              private store$: Store<RootStoreState.State>) { }
  ngOnInit() {
    this.isFilterActive = false;
    this.route.queryParamMap.pipe(
        map(params => {
          const paramsArray = [];
          params.keys.forEach(key => {
            paramsArray.push({
              key : key,
              value: params.get(key),
              type : ParamType.CATEGORY
            });
              });
                return paramsArray; })).
      subscribe(paramArray => {
        this.store$.dispatch(ParamStoreActions.AddOrUpdateAction({param : paramArray.shift()}));
      });
    this.productShorts =  this.store$.select(ProductStoreSelectors.selectAllProducts);
    this.objCount = this.store$.pipe(map(x => x.product.objCount));
    this.isLoading = this.store$.pipe(map(x => x.product.isLoading));
    this.isLoading.subscribe(x => {
    });
    this.store$.subscribe( x => {
      console.warn(x);
    });

  }

pageEvent(pageNumber: number) {
}
filterToggle() {
  this.isFilterActive = !this.isFilterActive;
}

toggleView(event) {
  this.isListActive = !event.value;
}

}
