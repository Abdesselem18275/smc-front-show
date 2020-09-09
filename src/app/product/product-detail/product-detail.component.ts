import { Component , ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProductShort, AppearanceVariant } from '../../models/product.models';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent    {

  product$: Observable<ProductShort>;
  selectedAppearanceVariant$ = new BehaviorSubject<AppearanceVariant>({}) ;
  constructor(private cdr: ChangeDetectorRef,private route: ActivatedRoute) {
    this.product$ = this.route.data.pipe(map(data => data.product));
   }
  setAppearanceVariant(appearanceVariant :AppearanceVariant ):void {
    this.selectedAppearanceVariant$.next(appearanceVariant);
    this.cdr.detectChanges()
  }
}
