import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {map, switchMap, concatMap, filter, tap } from 'rxjs/operators';
import * as ProductStoreActions from './actions';
import { ROUTER_NAVIGATED, RouterNavigatedPayload, RouterNavigatedAction } from '@ngrx/router-store';
import { SmcAuthService } from 'src/app/account/service/smc-auth.service';
import { AppDataService } from 'src/app/shared/service/app-data.service';
import { PaginatedProductsType, ProductShort } from 'src/app/models/product.models';
import { ParamMap, convertToParamMap, ActivatedRoute } from '@angular/router';
import { QUERY_PARAM_KEYS } from 'src/app/injectables';
import { Store } from '@ngrx/store';
import { RootStoreState } from '..';


@Injectable()
export class ProductEffects {


    fetchProducts$  = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED) ,
      filter((x: RouterNavigatedAction) =>  (x.payload.routerState.url).includes('product/list')),
      tap(() => this.store$.dispatch(ProductStoreActions.LoadRequestAction())),
      map(() => this.route.snapshot.queryParamMap),
      switchMap((param:ParamMap)  => this.ads.get<PaginatedProductsType>('/products/',param).pipe(
        map(results => {
          const page_number = param.has(this.queryParamKeys.PAGE) ? param.get(this.queryParamKeys.PAGE) : 1
          return page_number !== 1 ?
            ProductStoreActions.AddOrUpdateManyAction({results : results}):
            ProductStoreActions.SetManyProductsAction({payload:results})

        }
          )))));

    favoritesFetch$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ROUTER_NAVIGATED),
        filter((x: any) =>  (x.payload.event.url).includes('product/favorites')),
        switchMap(() =>
        this.ads.get<ProductShort[]>(`/profile/${this.as.getProfileId()}/favorites/`).pipe(
          concatMap(res => ([
            ProductStoreActions.ClearAllAction(),
            ProductStoreActions.AddOrUpdateManyAction({results : {
              results : res,
              count : res.length
            }})]))))));

constructor(private actions$: Actions ,
            private store$: Store<RootStoreState.State>,
            private route:ActivatedRoute,
            @Inject(QUERY_PARAM_KEYS) private queryParamKeys: any,
            private as: SmcAuthService,
            private ads: AppDataService) {}
  }
