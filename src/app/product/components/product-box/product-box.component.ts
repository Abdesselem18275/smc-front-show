 
import { Observable, BehaviorSubject, EMPTY } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Component, OnInit, Input, ChangeDetectionStrategy, Inject } from '@angular/core';
import { verticalAccordionAnimation } from 'src/app/animations';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { QUERY_PARAM_KEYS } from 'src/app/injectables';
import { Product, Category, AppearanceVariant } from 'src/app/models/product.models';
import { GlobalStateService } from 'src/app/shared/state/global-state.service';
import { ProductStateService } from 'src/app/product/state/product-state.service';


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
    private pss : ProductStateService,
    private gss : GlobalStateService,
    @Inject(QUERY_PARAM_KEYS) private queryParamKeys: any,
    private route: ActivatedRoute) {
      this.isSearchActive = this.route.queryParamMap.pipe(
        map(paramMap => paramMap.has(this.queryParamKeys.SEARCH)));
      this.isFavoriteRoute  =  this.route.url.pipe(
        map((urls: UrlSegment[]) => urls.toString().includes('favorites'))
      );
     }

  ngOnInit() {
    this.selectedAppearanceVariant$.next(this.product.appearanceVariants[0]);
    this.isBigSize$ = this.pss.isBigSize;
    this.rootCat$ = this.gss.categories.pipe(map(categories => categories.find(cat => cat.id === this.product.rootCategory)))
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
