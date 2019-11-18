import { Component, OnInit} from '@angular/core';
import { FormGroup} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AddOrUpdateAction } from 'src/app/root-store/param-store/actions';
import { ParamStoreState } from 'src/app/root-store/param-store';
import { ModalHandlerService } from 'src/app/shared/service/modal-handler.service';
import { FilterCategory, ParamType } from '../model';
import { FilterBuilderService } from '../service/filter-builder.service';



@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {

  filterForm: FormGroup;
  filterCategories: FilterCategory[] ;
  selectedFilter = '';
  isScrollOver: boolean;
  isScrollable: boolean;
  isActive: boolean;

  constructor(private fbs: FilterBuilderService,
              private store$: Store<ParamStoreState.State>,
              private modalHandlerService: ModalHandlerService
    ) {
   }

  ngOnInit() {
        this.filterForm = this.fbs.filterForm;
        this.filterCategories = this.fbs.filterCategories;
        this.onChanges();
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
  this.fbs.filterForm = this.filterForm;
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
  closeMenu() {
    this.modalHandlerService.closeAll();
  }
}
