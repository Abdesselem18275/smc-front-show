import { Component, OnInit, OnDestroy} from '@angular/core';
import { ProductShort, ParamType, Param } from '../model';
import { ActivatedRoute} from '@angular/router';
import { map} from 'rxjs/operators';
import { Store} from '@ngrx/store';
import { ParamStoreActions, ParamStoreSelectors } from 'src/app/root-store/param-store';
import { ProductStoreSelectors } from 'src/app/root-store/product-store';
import { RootStoreState } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { ModalHandlerService } from 'src/app/shared/service/modal-handler.service';
import { sideSlideInAnimation } from 'src/app/animations';
import { ModalStateStore } from 'src/app/shared/token';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: [sideSlideInAnimation]
})
export class ProductListComponent implements OnInit {

  productShorts: Observable<ProductShort[]>;
  objCount: Observable<number>;
  isLoading: Observable<boolean>;
  filterBox: Observable<boolean>;
  filterParamCount: Observable<number>;
  isSearchActive: Observable<boolean>;

  isFilterActive: boolean;
  isListActive: boolean;
  resetFilter: boolean;
  modalStateStore = new ModalStateStore();


  constructor(private route: ActivatedRoute,
              private modalHandler: ModalHandlerService,
              private store$: Store<RootStoreState.State>) { }
  ngOnInit() {
    this.isFilterActive = false;
    this.isListActive = false;
    this.route.queryParamMap.pipe(
        map(params => {
          const paramsArray = [];
          params.keys.forEach(key => {
            paramsArray.push({
              key : key,
              value: params.get(key),
              type : ParamType.CATEGORY
            });
              });
                return paramsArray; })).
      subscribe(paramArray => {
        this.store$.dispatch(ParamStoreActions.AddOrUpdateAction({param : paramArray.shift()}));
      });
    this.filterBox = this.modalHandler.ModalToggeler$.pipe( map(stateStore => stateStore.filterBox));
    this.productShorts =  this.store$.select(ProductStoreSelectors.selectAllProducts);
    this.objCount = this.store$.pipe(map(x => x.product.objCount));
    this.isLoading = this.store$.pipe(map(x => x.product.isLoading));
    this.filterParamCount = this.store$.select(ParamStoreSelectors.selectFilterPramCount);
    this.isSearchActive = this.store$.select(ParamStoreSelectors.selectAllParamsByType, { props: ParamType.SEARCH}).
                                      pipe(
                                        map( (params: Param[]) => params.length < 1));
  }

  toggleModal(key) {
    this.modalHandler.toggleModal(key);
  }

toggleView(event) {
  this.isListActive = event.value === 'list';
}



}
