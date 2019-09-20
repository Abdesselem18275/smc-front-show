import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ProductLong } from '../model';
import { Observable, of, EMPTY  } from 'rxjs';
import { ProductDataService } from './product-data.service';
import { mergeMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailResolverService implements Resolve<ProductLong> {

  constructor(private pds: ProductDataService, private router: Router) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> |
  Observable<never> {

    let id = route.paramMap.get('id');
    return this.pds.get_element({value: id, model: 'product'}).pipe(
      take(1),
      mergeMap((product: ProductLong) => {
        if (product) {
          return of(product);
        } else {
          this.router.navigate(['/product/list']);
          return EMPTY;
        }
      })
    );

  }
}
