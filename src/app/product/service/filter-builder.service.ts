import { Injectable } from '@angular/core';
import { FilterCategory } from '../model';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterCacheService } from './filter-cache.service';

@Injectable({
  providedIn: 'root'
})
export class FilterBuilderService {
  _filterCategories: FilterCategory[];
  constructor(private filterCache: FilterCacheService) { }

  get filterCategories() {
    return this.filterCache.fetchCachedFilter();
  }

  toFormGroup() {
    const group = {};
    this.filterCategories.forEach(filterCategorie => {
      const subGroup = {};
      if (filterCategorie.controlType === 'check-box') {
      filterCategorie.choices.forEach(choice => {
        subGroup[choice.key] = new FormControl(choice.value);
      });
      group[filterCategorie.key] = new FormGroup(subGroup);
      } else {
      group[filterCategorie.key] = new FormControl(filterCategorie.key);
      }
    });
    return new FormGroup(group);
  }
}
