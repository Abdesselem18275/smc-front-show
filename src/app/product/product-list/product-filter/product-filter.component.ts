import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { FilterBuilderService } from '../../service/filter-builder.service';
import { FilterCategory, ParamType } from '../../model';
import { debounceTime, pairwise, map, filter, tap, distinctUntilChanged} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { AddOrUpdateManyAction, NextPageAction, AddOrUpdateAction } from 'src/app/root-store/param-store/actions';
import { ParamStoreState } from 'src/app/root-store/param-store';



@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit, OnChanges {

  filterForm: FormGroup;
  filterCategories: FilterCategory[] ;
  @Output() req = new EventEmitter<Map<any, any>>();
  @Input() resetFilter: boolean;
  selectedFilter = '';
  isScrollOver: boolean;
  isScrollable: boolean;
  isActive: boolean;

  constructor(private fbs: FilterBuilderService,
              private store$: Store<ParamStoreState.State>,
    ) {
   }

  ngOnInit() {
        this.isActive = false;
        this.filterForm = this.fbs.toFormGroup();
        this.filterCategories = this.fbs.filterCategories;
        this.clearFilter();
        this.onChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.resetFilter.firstChange) {
      this.clearFilter();

    }
}

  onChanges(): void {
    Object.keys(this.filterForm.controls).forEach(key => {
      this.filterForm.get(key).valueChanges.pipe(
        debounceTime(500)).subscribe( tempForm  => {
          const reqArray = [];
          for (const property in tempForm) {
            if (tempForm[property]) {
              reqArray.push(property.substr(property.lastIndexOf('_') + 1));
            }
          }
        const param = {
           key: key,
           value: reqArray.join(','),
           type : ParamType.FILTER
         };
        this.store$.dispatch(AddOrUpdateAction({param : param}));
    });
  }) ;
}

  clearFilter() {
    Object.keys(this.filterForm.controls).forEach( (key: string) => {
      const tempForm_ = <FormGroup>this.filterForm.get(key);
       Object.keys(tempForm_.controls).filter(y =>  tempForm_.get(y).setValue(false) );
    });
  }
  toggleFilter(i) {
    this.selectedFilter === i ? this.selectedFilter = '' : this.selectedFilter = i;
  }
  toggleActive() {
    this.isActive = !this.isActive;
  }

}
