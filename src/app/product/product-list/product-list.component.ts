import { Component, OnInit, OnDestroy} from '@angular/core';
import { ProductShort, ParamType, Param } from '../model';
import { ActivatedRoute} from '@angular/router';
import { map} from 'rxjs/operators';
import { Store} from '@ngrx/store';
import { ParamStoreActions, ParamStoreSelectors } from 'src/app/root-store/param-store';
import { ProductStoreSelectors } from 'src/app/root-store/product-store';
import { RootStoreState } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { sideSlideInAnimation } from 'src/app/animations';
import { ModalStateStore } from 'src/app/shared/token';
import { ToggleAction } from 'src/app/root-store/modal-store/actions';
import { selectModalStateByType } from 'src/app/root-store/modal-store/selectors';

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
  searchTerm: Observable<string>;
  activeCategory: Observable<string>;

  isFilterActive: boolean;
  isModuleActive: boolean;
  resetFilter: boolean;
  modalStateStore = new ModalStateStore();


  constructor(private store$: Store<RootStoreState.State>) { }
  ngOnInit() {
    this.isFilterActive = false;
    this.isModuleActive = false;
    this.filterBox = this.store$.select(selectModalStateByType, {key: 'filterBox'});
    this.productShorts =  this.store$.select(ProductStoreSelectors.selectAllProducts);
    this.objCount = this.store$.pipe(map(x => x.product.objCount));
    this.isLoading = this.store$.pipe(map(x => x.product.isLoading));
    this.filterParamCount = this.store$.select(ParamStoreSelectors.selectFilterPramCount);
    this.isSearchActive = this.store$.select(ParamStoreSelectors.selectAllParamsByType, { type: ParamType.SEARCH}).
                            pipe(
                              map( (params: Param[]) => params.length !== 0));
    this.searchTerm = this.store$.select(ParamStoreSelectors.selectAllParamsByType, { type: ParamType.SEARCH}).pipe(
      map((params: Param[]) => {
        try {
          return params.shift().value;

        } catch (error) {
          return '';
        }


      }
    ));
    this.activeCategory = this.store$.select(ParamStoreSelectors.selectAllParamsByType, { type: ParamType.CATEGORY}).pipe(
      map((params: Param[]) => {
        try {
          return params.shift().value;

        } catch (error) {
          return '';
        }
      }
    ));
  }

  toggleModal(value) {
    this.store$.dispatch(ToggleAction({key : value}));
  }

toggleView(event) {
  this.isModuleActive = event.value === 'module';
}



}
