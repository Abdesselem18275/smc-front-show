import { Component, OnInit} from '@angular/core';
import { Store} from '@ngrx/store';
import { ProductStoreActions, ProductStoreSelectors } from 'src/app/root-store/product-store';
import { RootStoreState } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { sideSlideInAnimation } from 'src/app/animations';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/product.models';
import { PageEvent } from '@angular/material/paginator';
import { NavigationExtras, Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
const PRODUCTS_PER_PAGE = 10;
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: [sideSlideInAnimation]
})
export class ProductListComponent  {

  productShorts$: Observable<Product[]>;
  sizeIconName$: Observable<string>;
  objCount$: Observable<number>;
  isBigSize$: Observable<boolean>;
  isSmallScreen: boolean;
  constructor(
    private router: Router,
    breakpointObserver: BreakpointObserver,
    private store$: Store<RootStoreState.State>) {
    this.isSmallScreen = breakpointObserver.isMatched('(max-width: 500px)');
    this.objCount$ = this.store$.select(ProductStoreSelectors.selectProductsCount);
    this.productShorts$ =  this.store$.select(ProductStoreSelectors.selectAllProducts);
    this.isBigSize$ = this.store$.select(ProductStoreSelectors.selectIsBigBoxSize);
    this.sizeIconName$ = this.store$.select(ProductStoreSelectors.selectIsBigBoxSize).pipe(
      map(x => x ? 'view_comfy':'view_stream')
    );


   }
   updatePage(event: PageEvent): void {
    // this.paginator.pageIndex = event.pageIndex === 0 ? 1 : event.pageIndex
    const navExtra: NavigationExtras = {
      queryParams : {
        page_size : event.pageSize,
        page : event.pageIndex + 1
      },
      queryParamsHandling: 'merge'
    };
    this.router.navigate(['/product/list'],navExtra);
  }
  toggleSize(): void {
    this.store$.dispatch(ProductStoreActions.ToggleBoxSizeAction());
  }
}
