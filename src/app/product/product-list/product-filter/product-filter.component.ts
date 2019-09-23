import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { FilterBuilderService } from '../../service/filter-builder.service';
import { FilterCategory } from '../../model';
import { debounceTime} from 'rxjs/operators';



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

  constructor(private fbs: FilterBuilderService) {
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

         this.filterCategories.filter(category => category.key === key)[0].description =
              count === 0 ? '' : ['(', count.toString(), ' choices)'].join('');

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
  toggleActive() {
    this.isActive = !this.isActive;
  }

}
