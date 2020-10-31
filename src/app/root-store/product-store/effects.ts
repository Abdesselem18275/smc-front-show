import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {map, switchMap, concatMap, filter } from 'rxjs/operators';
import * as ProductStoreActions from './actions';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { SmcAuthService } from 'src/app/account/service/smc-auth.service';
import { AppDataService } from 'src/app/shared/service/app-data.service';
import { PaginatedProductsType, ProductShort } from 'src/app/models/product.models';
import { ParamMap, convertToParamMap } from '@angular/router';
import { CustomRouterNavigatedAction } from '../router-store/custom-route-serializer';


@Injectable()
export class ProductEffects {


    fetchProducts$  = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED) ,
      filter((x: any) =>  (x.payload.event.url).includes('product/list')),
      map((par:CustomRouterNavigatedAction) => convertToParamMap(par.payload.routerState.queryParams)),
      switchMap((param:ParamMap)  => this.ads.get<PaginatedProductsType>('/products/',param).pipe(
        map(results => (ProductStoreActions.AddOrUpdateManyAction({results : results})))))));

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
            private as: SmcAuthService,
            private ads: AppDataService) {}
  }
