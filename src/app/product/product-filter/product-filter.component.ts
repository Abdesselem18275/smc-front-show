import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fbs: FilterBuilderService , private pds: ProductDataService) {
   }

  ngOnInit() {
    this.filterCategories = this.pds.getCategories();
    this.filterForm = this.fbs.toFormGroup(this.filterCategories);
    this.filterForm.valueChanges.pipe().subscribe(
      val => console.warn(this.toUrlReq(val))
    );

  }

  toUrlReq(filterState: any) {
    let req = '';
    Object.keys(filterState).forEach(cateogrieFilter => {
      let subReq = cateogrieFilter.concat('=');
      Object.keys(filterState[cateogrieFilter]).filter(choice =>
        this.filterForm.get(cateogrieFilter.concat('.', choice)).value !== false).map(choice =>
            subReq = subReq.concat(choice, ','));
      subReq = subReq.concat('?');
      req = req.concat(subReq);
      });

      return(req);
  }

}
