import { Component, OnInit} from '@angular/core';
import { ProductShort } from '../../models/product.models';
import { Store} from '@ngrx/store';
import { ProductStoreSelectors } from 'src/app/root-store/product-store';
import { RootStoreState } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { sideSlideInAnimation } from 'src/app/animations';
import { selectModalStateByType } from 'src/app/root-store/modal-store/selectors';
import { map } from 'rxjs/operators';
const PRODUCTS_PER_PAGE = 10;
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: [sideSlideInAnimation]
})
export class ProductListComponent  {

  productShorts$: Observable<ProductShort[]>;
  isLoading: Observable<boolean>;
  filterBox$: Observable<boolean>;
  isLoading$:Observable<boolean>;
  isBigSize$:Observable<boolean>;
  pagesCount$:Observable<number>
  constructor(private store$: Store<RootStoreState.State>) {
    this.filterBox$ = this.store$.select(selectModalStateByType, {key: 'filterBox'});
    this.productShorts$ =  this.store$.select(ProductStoreSelectors.selectAllProducts);
    this.isLoading$ = this.store$.select(ProductStoreSelectors.selectIsLoading);
    this.isBigSize$ = this.store$.select(ProductStoreSelectors.selectIsBigBoxSize);
    this.pagesCount$ = this.store$.select(ProductStoreSelectors.selectProductsCount).pipe(
      map((x:number) => (Math.floor(x/PRODUCTS_PER_PAGE)+1))
    )

   }

}
