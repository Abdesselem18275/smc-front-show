import { Component, OnInit, OnDestroy} from '@angular/core';
import { ProductShort, ParamType, Param, Category } from '../../models/product.models';
import { Store} from '@ngrx/store';
import {  ParamStoreSelectors } from 'src/app/root-store/param-store';
import { ProductStoreSelectors } from 'src/app/root-store/product-store';
import { RootStoreState } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { sideSlideInAnimation } from 'src/app/animations';
import { selectModalStateByType } from 'src/app/root-store/modal-store/selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: [sideSlideInAnimation]
})
export class ProductListComponent implements OnInit {

  productShorts$: Observable<ProductShort[]>;
  isLoading: Observable<boolean>;
  filterBox$: Observable<boolean>;
  isLoading$:Observable<boolean>;
  isBigSize$:Observable<boolean>;
  constructor(private store$: Store<RootStoreState.State>) { }
  ngOnInit() {
    this.filterBox$ = this.store$.select(selectModalStateByType, {key: 'filterBox'});
    this.productShorts$ =  this.store$.select(ProductStoreSelectors.selectAllProducts);
    this.isLoading$ = this.store$.select(ProductStoreSelectors.selectIsLoading);
    this.isBigSize$ = this.store$.select(ProductStoreSelectors.selectIsBigBoxSize);

  }



}
