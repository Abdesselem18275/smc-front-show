import { ParamStoreSelectors, ProductStoreSelectors, ModalStoreActions, ProductStoreActions } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ProductShort, ParamType, Param, AppearanceVariant } from 'src/app/product/model';
import { RouterStoreSelectors } from 'src/app/root-store/router-store';
import { verticalAccordionAnimation } from 'src/app/animations';


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
  isDimensionOpen: boolean;
  isMaterialOpen: boolean;

  selectedAppearanceVariant$ : BehaviorSubject<AppearanceVariant> ;
  constructor(private store$: Store<any>) { }

  ngOnInit() {
    this.isSearchActive = this.store$.select(ParamStoreSelectors.selectAllParamsByType, { type: ParamType.SEARCH}).pipe(map( (params: Param[]) => params.length !== 0));
    this.isFavoriteRoute  = this.store$.select(RouterStoreSelectors.isCrrentUrl,{url:'favorites'});
    this.selectedAppearanceVariant$  = new BehaviorSubject<AppearanceVariant>(this.product.appearanceVariants[0])
    this.isBigSize$ = this.store$.select(ProductStoreSelectors.selectIsBigBoxSize)
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
