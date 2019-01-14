import { Injectable } from '@angular/core';
import { FilterCategory } from '../model';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FilterBuilderService {

  constructor() { }

  toFormGroup(filterCategories: FilterCategory[]) {
    let group = {};
    filterCategories.forEach(filterCategorie => {
      let subGroup = {};
      filterCategorie.choices.forEach(choice => {
        subGroup[choice.key] = new FormControl(choice.value);
      });
      group[filterCategorie.category] = new FormGroup(subGroup);
    });
    console.log(new FormGroup(group));
    return new FormGroup(group);
  }
}
