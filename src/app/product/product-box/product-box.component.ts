import { ProductStoreSelectors, ModalStoreActions, ProductStoreActions } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Component, OnInit, Input, ChangeDetectionStrategy, Inject } from '@angular/core';
import { ProductShort, AppearanceVariant, Category } from 'src/app/models/product.models';
import { RouterStoreSelectors } from 'src/app/root-store/router-store';
import { verticalAccordionAnimation } from 'src/app/animations';
import { GlobalStoreSelectors } from 'src/app/root-store/global-store';
import { ActivatedRoute } from '@angular/router';
import { QUERY_PARAM_KEYS } from 'src/app/injectables';


@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./product-box.component.scss'],
  animations: [verticalAccordionAnimation]

})
export class ProductBoxComponent implements OnInit  {

  @Input() product: ProductShort;
  isSearchActive: Observable<boolean>;
  isFavoriteRoute: Observable<any>;
  isBigSize$: Observable<boolean>;
  rootCat$ :Observable<Category>;
  isDimensionOpen: boolean;
  isMaterialOpen: boolean;

  selectedAppearanceVariant$ : BehaviorSubject<AppearanceVariant> ;
  constructor(
    @Inject(QUERY_PARAM_KEYS) private queryParamKeys: any,
    private route : ActivatedRoute,
    private store$: Store<any>) { }

  ngOnInit() {
    this.isSearchActive = this.route.queryParamMap.pipe(
      map(paramMap => paramMap.has(this.queryParamKeys.SEARCH)))
    this.isFavoriteRoute  = this.store$.select(RouterStoreSelectors.isCrrentUrl,{url:'favorites'});
    this.selectedAppearanceVariant$  = new BehaviorSubject<AppearanceVariant>(this.product.appearanceVariants[0])
    this.isBigSize$ = this.store$.select(ProductStoreSelectors.selectIsBigBoxSize)
    this.rootCat$ = this.store$.select(GlobalStoreSelectors.selectCategoryById,{id:this.product.rootCategory}).pipe(take(1))
  }
  setAppearanceVariant(appearanceVariant :AppearanceVariant ) {
    this.selectedAppearanceVariant$.next(appearanceVariant);
  }
  toggleDimension() {
    this.isMaterialOpen = false
    this.isDimensionOpen = !this.isDimensionOpen
  }
  toggleMaterial() {
    this.isDimensionOpen = false
    this.isMaterialOpen = !this.isMaterialOpen

  }
  toggleModal(value) {
    this.store$.dispatch(ProductStoreActions.LoadProductAction({product:this.product}))
    this.store$.dispatch(ModalStoreActions.ToggleWithAuth({key: value}));
  }

}
