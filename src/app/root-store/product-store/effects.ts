import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductDataService } from 'src/app/product/service/product-data.service';
import {map, switchMap, withLatestFrom, concatMap, tap, filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as ProductStoreActions from './actions';
import * as ProductStoreState from './state';
import { of } from 'rxjs';
import { AddOrUpdateManyAction, ClearAction } from '../param-store/actions';
import { selectAllParams } from '../param-store/selectors';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { SmcAuthService } from 'src/app/account/service/smc-auth.service';


@Injectable()
export class ProductEffects {
    fetchProducts$  = createEffect(() =>
    this.actions$.pipe(
          ofType(AddOrUpdateManyAction, ClearAction) ,
          tap(() => console.warn('Hello')),
          concatMap(action => of(action).pipe(
            withLatestFrom(this.store$.pipe(
            select(selectAllParams))))),
          switchMap(([action, params])  => this.pds.get_elements({model: 'product', param_key : params}).pipe(
           map(results => (ProductStoreActions.AddOrUpdateManyAction({results : results})))))));

    favoritesFetch$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ROUTER_NAVIGATED),
        filter((x: any) =>  (x.payload.event.url).includes('account/profile')),
        switchMap(() => this.authService.getUserFavorites().pipe(
          concatMap(res => ([
            ProductStoreActions.ClearAllAction(),
            ProductStoreActions.AddOrUpdateManyAction({results : {
              results : res,
              count : res.length
            }})]))))));

constructor(private actions$: Actions ,
            private store$: Store<ProductStoreState.State>,
            private authService: SmcAuthService,
            private pds: ProductDataService) {}
  }

