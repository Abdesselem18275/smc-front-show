import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { GlobalStoreSelectors } from 'src/app/root-store/global-store';
import { merge } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private store$: Store<any> ) { }

  loadInitials(): Promise<Object> {
    return new Promise(resolve => {
      
      resolve(true); // Some http to get data and then resolve
   })
    // return this.store$.select(GlobalStoreSelectors.selectCategories).pipe(
    //   merge(this.store$.select(GlobalStoreSelectors.selectFilters))).toPromise();
  }
}
