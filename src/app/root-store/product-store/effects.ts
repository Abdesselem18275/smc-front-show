import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductDataService } from 'src/app/product/service/product-data.service';
import {map, switchMap, withLatestFrom, concatMap, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as ProductStoreActions from './actions';
import * as ProductStoreState from './state';
import * as ParamStore from '../param-store';
import { of } from 'rxjs';


@Injectable()
export class ProductEffects {
    fetchProducts$  = createEffect(() =>
    this.actions$.pipe(
          ofType(ParamStore.ParamStoreActions.AddOrUpdateManyAction) ,
          concatMap(action => of(action).pipe(
            withLatestFrom(this.store$.pipe(
            select(ParamStore.ParamStoreSelectors.selectAllParams))))),
          switchMap(([action, params])  => this.pds.get_elements({model: 'product', param_key : params}).pipe(
           map(results => (ProductStoreActions.AddOrUpdateManyAction({results : results})))))));
constructor(private actions$: Actions ,
            private store$: Store<ProductStoreState.State>,
            private pds: ProductDataService) {}
  }

