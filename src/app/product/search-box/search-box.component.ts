import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, tap} from 'rxjs/operators';
import { ParamType } from '../model';
import { Store } from '@ngrx/store';
import { ParamStoreState, ParamStoreActions , ModalStoreActions } from 'src/app/root-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  searchBar = new FormControl('');
  searchTerm: string;


  constructor(
              private router: Router,
              private store$: Store<ParamStoreState.State>) { }
  ngOnInit() {
  this.searchBar.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(term => {
        this.searchTerm = term;
      }),
      filter((term: string) => term !== '' && term.length > 2)).subscribe(term => {
        const param = {
          key: 'search',
          value: term,
          type : ParamType.SEARCH
        };
       this.store$.dispatch(ParamStoreActions.AddOrUpdateAction({param : param}));
       this.router.navigate(['product/list']);

      });

}

closePopup() {
    this.store$.dispatch(ModalStoreActions.CloseAllAction());
    this.store$.dispatch(ParamStoreActions.DeleteManyAction({ids : ['search']}));
}
}
