import { Component , ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AppearanceVariant, BaseImage, ProductShort } from 'src/app/core/types';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent    {
  isSmallScreen$: Observable<boolean>;
  product$: Observable<ProductShort>;
  selectedAppearanceVariant$ = new BehaviorSubject<AppearanceVariant>({}) ;
  constructor(breakpointObserver: BreakpointObserver, private cdr: ChangeDetectorRef,private route: ActivatedRoute) {
    this.product$ = this.route.data.pipe(map(data => data.product));
    this.isSmallScreen$ = breakpointObserver.observe('(max-width: 1200px)').pipe(map(x => x.matches));
   }
  setAppearanceVariant(appearanceVariant: AppearanceVariant ): void {
    this.selectedAppearanceVariant$.next(appearanceVariant);
    this.cdr.detectChanges();
  }
  get images(): Observable<string[]> {
    return this.selectedAppearanceVariant$ && this.selectedAppearanceVariant$.asObservable().pipe(
      map((appVariance: AppearanceVariant) =>
      appVariance.images.map((image: BaseImage) => image.content).concat(appVariance.thumbNail).reverse())
    );
  }

}
