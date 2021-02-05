import * as fromGlobalReducer from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './state';
import { FormGroup, FormControl } from '@angular/forms';
import { Category, FilterCategory, Choice } from 'src/app/models/product.models';


export const selectGlobalState = createFeatureSelector<State>(fromGlobalReducer.featureKey);


export const selectLanguage = createSelector(selectGlobalState,(state) => state.language);
export const selectCategories =  createSelector(selectGlobalState,(state) => state.categories);
export const selectRootCategories =  createSelector(selectGlobalState,(state) => state.categories.filter(cat => cat.isRoot));
export const selectRootCategory =  createSelector(selectRootCategories,(categories) => ({
              designation : 'All products',
              children : categories}));
export const selectFilters =  createSelector(selectGlobalState,(state) => state.filters);
export const selectNavMenuTree =  createSelector(selectGlobalState,(state) =>state.navMenuTree);
export const selectRequestSubjects = createSelector(selectGlobalState,(state) => state.requestSubjects);
export const selectCategoryById = createSelector(selectCategories,
    (categories: Category[],props: {id: number}) => props.id ? getItem(categories,props.id): null);
export const selectFilterForm = createSelector(
    selectFilters,
    (filters: FilterCategory[]) => toFormGroup(filters)
  );

  const getItem = (categories: Category[],key: number | undefined): Category | undefined =>
  categories.find(category =>  category.id === key);

  const setItems = (categories: Category[],param: Category|undefined): Category[] => {
    if ((param === undefined ) || param.designation==='All Cateogries') {
      return [];
    } else {
      const cat = getItem(categories,param.id);
      const parentCategory = getItem(categories,param.parentCategory);
      return([param].concat(setItems(categories,cat?.isRoot ? undefined : parentCategory)));
    }

  };



   const toFormGroup = (filtersArray: FilterCategory[]) => {
    const group: {[key: string]: any} = {};
    filtersArray.forEach((filterCategories: FilterCategory) => {
      const subGroup: {[key: string]: any} = {};
      if (filterCategories.controlType === 'check-box') {
      filterCategories.choices.forEach((choice: Choice) => {
        subGroup[choice.key] = new FormControl(false);
      });
      group[filterCategories.key] = new FormGroup(subGroup);
      } else {
      group[filterCategories.key] = new FormControl('false');
      }
    });
    return new FormGroup(group);
  };
