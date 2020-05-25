import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { NextPageAction, AddOrUpdateAction, AddOrUpdateManyAction, DeleteManyAction, ClearAction, LoadActiveCategoryAction } from "./actions";
import { Store, select } from "@ngrx/store";
import { map, switchMap, filter, concatMap, withLatestFrom, tap, exhaustMap } from "rxjs/operators";
import { State } from "./state";
import { ParamType, Param, Category } from "src/app/product/model";
import { selectPageParam , selectAllParams } from "./selectors";
import { of } from "rxjs";
import * as ProductStore from '../product-store';
import { ROUTER_NAVIGATED } from "@ngrx/router-store";
import { GlobalStoreSelectors } from "../global-store";


@Injectable()
export class ParamEffects {

    nextPage$ = createEffect(() =>
    this.actions$.pipe(
        ofType(NextPageAction),
        concatMap(action => of(action).pipe(withLatestFrom(this.store$.pipe(select(selectPageParam))))),
        map(action => action[1]),
        filter((params) => {
                const pageCounter = parseInt(params.page_number, 10);
                const pageCount = Math.ceil( params.count / 10);
                return pageCounter + 1  <= pageCount;
            }),
        switchMap((params) => {
            const param = {
                key : 'page',
                value : (parseInt(params.page_number, 10) + 1).toString(),
                type : ParamType.PAGE
            };
            return [AddOrUpdateManyAction({params : [param]}),
                    ProductStore.ProductStoreActions.LoadRequestAction()];
        })));

    paramLogic$ = createEffect(() =>
    this.actions$.pipe(
        ofType(AddOrUpdateAction),
        concatMap(action => of(action).pipe(withLatestFrom(this.store$.pipe(select(selectAllParams))))),
        filter(data => data[0].param !== undefined),
        switchMap(data => {

            const action = data[0];
            const allParams = data[1];
            const pageInit = {
                key : 'page',
                value: '1',
                type : ParamType.PAGE };
            switch (action.param.type) {
                case ParamType.FILTER:
                case ParamType.CATEGORY: {
                    return [
                        ProductStore.ProductStoreActions.ClearAllAction(),
                        DeleteManyAction(
                            {ids :
                                allParams.filter(param => (param.type === ParamType.SEARCH || param.type === ParamType.CATEGORY  ) ).
                                map(param => param.key)
                            }),
                        AddOrUpdateManyAction({params : [action.param , pageInit]}) ,
                        ProductStore.ProductStoreActions.LoadRequestAction()];
                    }
                case ParamType.PAGE: {
                    return [
                        action,
                        ProductStore.ProductStoreActions.LoadRequestAction()
                    ];
                }
                case ParamType.SEARCH: {
                    return [
                    ProductStore.ProductStoreActions.ClearAllAction(),
                    ClearAction(),
                    AddOrUpdateManyAction({params : [action.param , pageInit]}) ,
                    ProductStore.ProductStoreActions.LoadRequestAction()];
                }
        }}
            )
    ));

    queryParam$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ROUTER_NAVIGATED),
        filter((x: any) =>  (x.payload.event.url).includes('product/list')),
        map((actions: any) => actions.payload.routerState.queryParams),
        map(param => Object.keys(param).length === 0 ? {dummyKey: ""} :param),
        map((params) => {
                const paramsArray = [];
                Object.keys(params).forEach(key => {
                  paramsArray.push( {
                    key : key,
                    value: params[key],
                    type : ParamType.CATEGORY
                  })});
                return paramsArray.shift();
            }),
        withLatestFrom(this.store$.select(GlobalStoreSelectors.selectCategories)),
        switchMap(([param,categories] : [Param,Category[]]) => [
            LoadActiveCategoryAction({ payload: categories.filter(cat => cat.designation === param.value).shift() }),
            AddOrUpdateAction({ param: param })
        ]
        )));



    constructor(private actions$: Actions,
                private store$: Store<State> ) {

    }
 }



