import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { NextPageAction, AddOrUpdateAction, AddOrUpdateManyAction } from "./actions";
import { Store, select } from "@ngrx/store";
import { map, tap, debounceTime, switchMap, filter, concatMap, withLatestFrom } from "rxjs/operators";
import { State } from "./state";
import { ParamType } from "src/app/product/model";
import { selectPageParam } from "./selectors";
import { of } from "rxjs";
import * as ProductStore from '../product-store';

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
                console.log([pageCounter, pageCount]);

                return pageCounter + 1  <= pageCount;
            }),
        map((params) => {
            const param = {
                key : 'page',
                value : (parseInt(params.page_number, 10) + 1).toString(),
                type : ParamType.PAGE
            };
            return AddOrUpdateManyAction({
                params : [param]
            });
        })));

    paramLogic$ = createEffect(() =>
    this.actions$.pipe(
        ofType(AddOrUpdateAction),
        switchMap(action => {
            const pageInit = {
                key : 'page',
                value: '1',
                type : ParamType.PAGE };

            switch (action.param.type) {
                case ParamType.FILTER:
                case ParamType.SEARCH:
                case ParamType.CATEGORY: {
                    return [
                        ProductStore.ProductStoreActions.ClearAllAction(),
                        AddOrUpdateManyAction({params : [action.param , pageInit]}) ,
                        ProductStore.ProductStoreActions.LoadRequestAction()];
                    }
                case ParamType.PAGE: {
                    return [
                        action, ProductStore.ProductStoreActions.LoadRequestAction()
                    ];
                }

        }}
            )
    ));


    constructor(private actions$: Actions,
                private store$: Store<State> ) {

    }
 }



