import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { FilterBuilderService } from '../service/filter-builder.service';
import { ProductDataService } from '../service/product-data.service';
import { FilterCategory } from '../model';
import { debounceTime } from 'rxjs/operators';



@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  filterForm: FormGroup;
  filterCategories: FilterCategory[] ;
  @Output() req = new EventEmitter<any>();
  ready: boolean;


  constructor(private fbs: FilterBuilderService , private pds: ProductDataService) {
   }

  ngOnInit() {
    this.ready = false;
    this.pds.getFilters().subscribe((filterCategories => { this.filterCategories = filterCategories;
        this.filterForm = this.fbs.toFormGroup(this.filterCategories);
        this.clearFilter();
        this.ready = true;
        this.onChanges();
      }));
  }

  onChanges(): void {
    this.filterForm.valueChanges.pipe(debounceTime(500)).subscribe(x => {
      let map = new Map();
      Object.keys(x).forEach(key => {
        let req = '';
        const tempForm = <FormGroup>this.filterForm.get(key);
        Object.keys(tempForm.controls).filter(y =>  tempForm.get(y).value).
               forEach( z => {
                         req = req + z.substr(z.lastIndexOf('_') + 1) + ',';
         });
         map.set(key, req);


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

}
