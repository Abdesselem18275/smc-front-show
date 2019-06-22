import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { FilterBuilderService } from '../../service/filter-builder.service';
import { FilterCategory } from '../../model';
import { trigger, state, style, transition, animate, query } from '@angular/animations';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FilterCacheService } from '../../service/filter-cache.service';



@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        display : 'flex',

      })),
      state('closed', style({
      })),
      transition('closed => open',
      [
        animate('0.15s')
      ]),
      transition('open => closed', [
        animate('0.15s')
      ]),
    ]),
  ],
})
export class ProductFilterComponent implements OnInit {
  filterForm: FormGroup;
  filterCategories: FilterCategory[] ;
  @Output() req = new EventEmitter<Map<any, any>>();
  selectedFilter = '';
  isScrollOver: boolean;
  isScrollable: boolean;

  constructor(private fbs: FilterBuilderService , private filterCache: FilterCacheService) {
   }

  ngOnInit() {

        this.filterForm = this.fbs.toFormGroup();
        this.filterCategories = this.fbs.filterCategories;
        this.clearFilter();
        this.onChanges();
  }

  onChanges(): void {
    this.filterForm.valueChanges.pipe(debounceTime(500)).subscribe(x => {
      let map = new Map();
      Object.keys(x).forEach(key => {
        let req = '';
        let count = 0;
        const tempForm = <FormGroup>this.filterForm.get(key);
        Object.keys(tempForm.controls).filter(y =>  tempForm.get(y).value).
               forEach( z => {
                         count = count + 1 ;
                         req = req + z.substr(z.lastIndexOf('_') + 1) + ',';
         });
         map.set(key, req);
         console.warn(key);

         this.filterCategories.filter(category => category.key === key)[0].description =
              count === 0 ? '' : ['(', count.toString(), ' choices)'].join('');
         console.warn(this.filterCategories.filter(category => category.key === key)[0].description);

    });
    this.req.emit(map);
  });
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

}
