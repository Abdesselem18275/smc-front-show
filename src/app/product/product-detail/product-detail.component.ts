import { Component , ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProductShort, AppearanceVariant } from '../../models/product.models';
import { BreakpointObserver } from '@angular/cdk/layout';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent    {
  isSmallScreen$ : Observable<Boolean>
  product$: Observable<ProductShort>;
  selectedAppearanceVariant$ = new BehaviorSubject<AppearanceVariant>({}) ;
  constructor(private breakpointObserver: BreakpointObserver, private cdr: ChangeDetectorRef,private route: ActivatedRoute) {
    this.product$ = this.route.data.pipe(map(data => data.product));
    this.isSmallScreen$ = breakpointObserver.observe('(max-width: 1200px)').pipe(map(x => x.matches));

   }
  setAppearanceVariant(appearanceVariant :AppearanceVariant ):void {
    this.selectedAppearanceVariant$.next(appearanceVariant);
    this.cdr.detectChanges()
  }
  get images() : Observable<string[]> {
    return this.selectedAppearanceVariant$.asObservable().pipe(
      map(appVariance => appVariance.images.map(image => image.content).concat(appVariance.thumbNail).reverse())
    )
  }
}
