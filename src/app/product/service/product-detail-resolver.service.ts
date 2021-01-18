import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY  } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RootStoreState, ProductStoreActions } from 'src/app/root-store';
import { AppDataService } from 'src/app/shared/service/app-data.service';
import { Product } from 'src/app/core/types';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailResolverService implements Resolve<Product> {

  constructor(private ads: AppDataService, private router: Router,private store$: Store<RootStoreState.State>) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> |
  Observable<never> {
    this.store$.dispatch(ProductStoreActions.LoadRequestAction());
    const id = route.paramMap.get('id');
    return this.ads.get<Product>(`/products/${id}/`).pipe(
      take(1),
      mergeMap((product: Product) => {
        if (product) {
          this.store$.dispatch(ProductStoreActions.LoadProductAction({product}));
          return of(product);
        } else {
          this.router.navigate(['/product/list']);
          return EMPTY;
        }
      })
    );

  }
}
