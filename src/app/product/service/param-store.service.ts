import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PramAction } from '../action';
import { ParamStore } from '../store';


@Injectable({
  providedIn: 'root'
})
export class ParamStoreService {
  paramStore  = new ParamStore();
  paramStore$ = new BehaviorSubject<ParamStore>(new ParamStore());

  constructor() { }

  dispatch(action: PramAction) {
    let tempParamStore = new ParamStore();

    switch (action.type) {
      case 'CATEGORY': {
        action.content.forEach((value, key) => {
          tempParamStore.category.set(key, value);
          });
          break;
            }
      case 'FILTER': {
        tempParamStore.category = this.paramStore.category;
        action.content.forEach((value, key) => {
          tempParamStore.filter.set(key, value);
        });
        break;
      }
      case 'page' : {
        tempParamStore = this.paramStore;
        action.content.forEach((value, key) => {
          tempParamStore.page.set(key, value);
        });
        break;
      }
      case 'SEARCH' : {
        tempParamStore = this.paramStore;
        action.content.forEach((value, key) => {
          tempParamStore.search.set(key, value);
        });
      }
    }
    this.paramStore = tempParamStore;
    this.paramStore$.next(this.paramStore);
  }
}
