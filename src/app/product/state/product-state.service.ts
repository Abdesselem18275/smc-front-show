import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, switchMap, withLatestFrom, startWith } from 'rxjs/operators';
import { ApiProduct, PaginatedObjectsType, Product } from 'src/app/models/product.models';
import { AppDataService } from 'src/app/shared/services/app-data.service';

@Injectable({
  providedIn: 'root'
})
export class ProductStateService {
  private productsSubject = new BehaviorSubject<Product[]>([])
  private productsCountSubject = new BehaviorSubject<number>(0)
  private isBigSizeSubject = new BehaviorSubject<boolean>(true)

  constructor(
    private ads : AppDataService,
    private route : ActivatedRoute) { 
    this.route.queryParamMap.pipe(
      debounceTime(100),
      switchMap(
        (paramMap: ParamMap) => 
          this.ads.get<PaginatedObjectsType<ApiProduct>>('/product/products/', paramMap)),
      ).subscribe((response:PaginatedObjectsType<ApiProduct>)=> {
        this.setProducts(response.results.map(pro => new Product(pro)))
        this.setProductsCount(response.count)
      });
  }

  toggleBoxSize():void {
    const val = this.isBigSizeSubject.getValue()
    this.isBigSizeSubject.next(!val)
  }
  setIsBigSize(payload:boolean):void {
    this.isBigSizeSubject.next(payload)
  }
  get isBigSize():Observable<boolean> {
    return this.isBigSizeSubject.asObservable()
  }

  setProducts(payload:Product[]):void {
    this.productsSubject.next(payload)
  }
  get products():Observable<Product[]> {
    return this.productsSubject.asObservable()
  }
  setProductsCount(payload:number):void {
    this.productsCountSubject.next(payload)
  }
  get productsCount():Observable<number> {
    return this.productsCountSubject.asObservable()
  }
}
