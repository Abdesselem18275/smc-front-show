import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { GlobalStoreSelectors } from 'src/app/root-store/global-store';
import { merge, of, interval, Subject } from 'rxjs';
import { take, filter, tap } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material/icon';



@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private iconRegistry: MatIconRegistry ,private store$: Store<any> ) { }

  loadInitials(): Promise<void| Object> {

    return this.store$.select(GlobalStoreSelectors.selectCategories).pipe(
             take(2)
           )
           .toPromise().then()
    //return interval(1000).pipe(take(1)).toPromise(); // this

  }
}
