import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { FilterBuilderService } from '../service/filter-builder.service';
import { ProductDataService } from '../service/product-data.service';
import { FilterCategory } from '../model';
import { MatCheckbox } from '@angular/material';


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
        this.ready = true;
      }));
  }

  changed(event , filter: FilterCategory) {
    if (event.source instanceof MatCheckbox) {
        this.filterCategories.filter(x => x === filter)[0].
              choices.filter(x => x.key === event.source.id)[0].checked = event.checked;
    } else {
      this.filterCategories.filter(x => x === filter)[0].inputValue = event.value;
    }
    let req = '?';
    this.filterCategories.forEach(category => {
      req = req + '&' + category.key + '=';
        if (category.controlType === 'check-box') {
          category.choices.filter(choice => choice.checked).map(choice => req = req + choice.value + ',');
        } else {
          req = req + category.inputValue;
        }
      });
    this.req.emit(req);
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    return value;
  }
}
