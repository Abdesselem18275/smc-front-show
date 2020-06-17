import { Component , OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProductShort, AppearanceVariant } from '../model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit   {

  product$: Observable<ProductShort>;
  selectedAppearanceVariant$ = new BehaviorSubject<AppearanceVariant>({}) ;
  constructor(private cdr: ChangeDetectorRef,private route: ActivatedRoute) { }

  ngOnInit() {
    this.product$ = this.route.data.pipe(map(data => data.product))
    this.selectedAppearanceVariant$.subscribe(x => console.warn(x))
  }
  setAppearanceVariant(appearanceVariant :AppearanceVariant ) {
    this.selectedAppearanceVariant$.next(appearanceVariant);
    this.cdr.detectChanges()
  }
}
