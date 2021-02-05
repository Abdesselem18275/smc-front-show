import { ProductStoreSelectors} from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject, EMPTY } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Component, OnInit, Input, ChangeDetectionStrategy, Inject } from '@angular/core';
import { verticalAccordionAnimation } from 'src/app/animations';
import { GlobalStoreSelectors } from 'src/app/root-store/global-store';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { QUERY_PARAM_KEYS } from 'src/app/injectables';
import { Product, Category, AppearanceVariant } from 'src/app/models/product.models';


@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./product-box.component.scss'],
  animations: [verticalAccordionAnimation]

})
export class ProductBoxComponent implements OnInit  {

  @Input() product!: Product;
  isSearchActive: Observable<boolean>;
  isFavoriteRoute: Observable<any>;
  isBigSize$: Observable<boolean> = EMPTY;
  rootCat$: Observable<Category>= EMPTY;
  isDimensionOpen = false;
  isMaterialOpen = false;

  selectedAppearanceVariant$ = new BehaviorSubject<AppearanceVariant | null>(null) ;
  constructor(
    @Inject(QUERY_PARAM_KEYS) private queryParamKeys: any,
    private route: ActivatedRoute,
    private store$: Store<any>) {
      this.isSearchActive = this.route.queryParamMap.pipe(
        map(paramMap => paramMap.has(this.queryParamKeys.SEARCH)));
      this.isFavoriteRoute  =  this.route.url.pipe(
        map((urls: UrlSegment[]) => urls.toString().includes('favorites'))
      );
     }

  ngOnInit() {

    this.selectedAppearanceVariant$.next(this.product.appearanceVariants[0]);
    this.isBigSize$ = this.store$.select(ProductStoreSelectors.selectIsBigBoxSize);
    this.rootCat$ = this.store$.select(GlobalStoreSelectors.selectCategoryById,{id:this.product.rootCategory}).pipe(take(1));
  }
  setAppearanceVariant(appearanceVariant: AppearanceVariant ) {
    this.selectedAppearanceVariant$.next(appearanceVariant);
  }
  toggleDimension() {
    this.isMaterialOpen = false;
    this.isDimensionOpen = !this.isDimensionOpen;
  }
  toggleMaterial() {
    this.isDimensionOpen = false;
    this.isMaterialOpen = !this.isMaterialOpen;

  }


}
