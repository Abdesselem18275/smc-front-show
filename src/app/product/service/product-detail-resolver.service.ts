import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY  } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
 
import { AppDataService } from 'src/app/shared/services/app-data.service';
import { ApiProduct, Product } from 'src/app/models/product.models';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailResolverService implements Resolve<Product> {

  constructor(private ads: AppDataService, private router: Router) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> |
  Observable<never> {
    const id = route.paramMap.get('id');
    return this.ads.get<ApiProduct>(`/product/products/${id}/`).pipe(
      take(1),
      mergeMap((product: ApiProduct) => {
        if (product) {
          return of(new Product(product));
        } else {
          this.router.navigate(['/product/list']);
          return EMPTY;
        }
      })
    );

  }
}
