import { Injectable } from '@angular/core';
import { FilterCategory } from '../model';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterCacheService } from './filter-cache.service';

@Injectable({
  providedIn: 'root'
})
export class FilterBuilderService {
  private _filterCategories: FilterCategory[];
  private _filterForm: FormGroup;


  
  public get filterForm(): FormGroup {
    return this._filterForm;
  }
  public set filterForm(value: FormGroup) {
    this._filterForm = value;
  }
  constructor(private filterCache: FilterCacheService) {
    this.toFormGroup();
  }



  get filterCategories() {
    if (!this._filterCategories) {
      this._filterCategories = this.filterCache.fetchCachedFilter();
    }
    return this._filterCategories;
  }

  toFormGroup() {
    console.warn('Filter builder');
    const group = {};
    this.filterCategories.forEach(filterCategorie => {
      const subGroup = {};
      if (filterCategorie.controlType === 'check-box') {
      filterCategorie.choices.forEach(choice => {
        subGroup[choice.key] = new FormControl(false);
      });
      group[filterCategorie.key] = new FormGroup(subGroup);
      } else {
      group[filterCategorie.key] = new FormControl('false');
      }
    });
    this.filterForm = new FormGroup(group);
  }
}
