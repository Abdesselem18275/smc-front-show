import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, tap} from 'rxjs/operators';
import { ParamType } from '../model';
import { ModalHandlerService } from 'src/app/shared/service/modal-handler.service';
import { Store } from '@ngrx/store';
import { ParamStoreState } from 'src/app/root-store';
import { AddOrUpdateAction } from 'src/app/root-store/param-store/actions';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  searchBar = new FormControl('');
  searchTerm: string;


  constructor(private modalHandlerService: ModalHandlerService,
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
       this.store$.dispatch(AddOrUpdateAction({param : param}));
      });

}

closePopup() {
  const param = {
    key: 'search',
    value: '',
    type : ParamType.SEARCH
  };
    this.store$.dispatch(AddOrUpdateAction({param : param}));
    this.modalHandlerService.closeAll();
}
}
