import { Router } from '@angular/router';
import { RootStoreState, ParamStoreSelectors, ProductStoreActions, ProductStoreSelectors } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ProductShort, ParamType, Param, AppearanceVariant } from 'src/app/product/model';
import { UserStoreActions } from 'src/app/root-store/user-store';
import { RouterStoreSelectors } from 'src/app/root-store/router-store';
import { verticalAccordionAnimation } from 'src/app/animations';


@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
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

  public selectedAppearanceVariant$ = new Subject<AppearanceVariant>() ;
  constructor(private store$: Store<any>) { }

  ngOnInit() {
    this.isSearchActive = this.store$.select(ParamStoreSelectors.selectAllParamsByType, { type: ParamType.SEARCH}).pipe(map( (params: Param[]) => params.length !== 0));
    this.isFavoriteRoute  = this.store$.select(RouterStoreSelectors.isCrrentUrl,{url:'favorites'});
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

}
