import { Component, OnInit } from '@angular/core';
import { RootStoreState, ProductStoreSelectors, ModalStoreActions, ParamStoreSelectors } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ParamType, Param } from '../model';

@Component({
  selector: 'app-list-meta',
  templateUrl: './list-meta.component.html',
  styleUrls: ['./list-meta.component.scss']
})
export class ListMetaComponent implements OnInit {
  objCount$: Observable<number>;
  isLoading$: Observable<boolean>;
  filterParamCount$: Observable<number>;
  isSearchActive$: Observable<boolean>;
  searchTerm$: Observable<string>;
  constructor(private store$: Store<RootStoreState.State>) { }

  ngOnInit(): void {
    this.objCount$ = this.store$.select(ProductStoreSelectors.selectProductsCount);
    this.isLoading$ = this.store$.select(ProductStoreSelectors.selectIsLoading);
    this.filterParamCount$ = this.store$.select(ParamStoreSelectors.selectAllParamsByTypeCount,{type:ParamType.FILTER})
    this.isSearchActive$ = this.store$.select(ParamStoreSelectors.selectIsParamExist, { type: ParamType.SEARCH})
    this.searchTerm$ = this.store$.select(ParamStoreSelectors.selectAllParamsByType, { type: ParamType.SEARCH}).pipe(
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
    this.store$.dispatch(ModalStoreActions.ToggleAction({key : value}));
  }


}
