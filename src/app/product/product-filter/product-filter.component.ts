import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { FilterBuilderService } from '../service/filter-builder.service';
import { ProductDataService } from '../service/product-data.service';
import { FilterCategory } from '../model';



@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  filterForm: FormGroup;
  filterCategories: FilterCategory[] ;
  @Output() req = new EventEmitter<string>();
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
    this.filterForm.valueChanges.subscribe(x => {
      let req = '';
      Object.keys(x).forEach(key => {
        req = req + '&' + key + '=';
        const tempForm = <FormGroup>this.filterForm.get(key);
        Object.keys(tempForm.controls).filter(y =>  tempForm.get(y).value).
               forEach( z => {
                         req = req + z.substr(z.lastIndexOf('_') + 1) + ',';
         });
    });
      this.req.emit(req);
  });
}

  clearFilter() {
    Object.keys(this.filterForm.controls).forEach( (key: string) => {
      const tempForm_ = <FormGroup>this.filterForm.get(key);
       Object.keys(tempForm_.controls).filter(y =>  tempForm_.get(y).setValue(false) );
    });
  }

}
