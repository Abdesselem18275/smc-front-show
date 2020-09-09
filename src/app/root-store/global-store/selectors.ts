import * as fromGlobalReducer from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './state';
import { Category,ProductShort, FilterCategory } from 'src/app/models/product.models';
import { RouterStoreSelectors } from '../router-store';
import { FormGroup, FormControl } from '@angular/forms';


export const selectGlobalState = createFeatureSelector<State>(fromGlobalReducer.featureKey);


export const selectLanguage = createSelector(selectGlobalState,(state) => state.language);
export const selectCategories =  createSelector(selectGlobalState,(state) => state.categories);
export const selectRootCategories =  createSelector(selectGlobalState,(state) => state.categories.filter(cat => cat.isRoot));
export const selectRootCategory =  createSelector(selectRootCategories,(categories) => ({
              designation : 'All products',
              children : categories}));
export const selectFilters =  createSelector(selectGlobalState,(state) => state.filters);
export const selectNavMenuTree =  createSelector(selectGlobalState,(state) =>state.navMenuTree);
export const selectCategoryQueryParam = createSelector(
    selectCategories,
    RouterStoreSelectors.selectQueryParams,
    (categories,queryParams) =>
    {
      return queryParams['categories__designation__in'] !== '' && queryParams['categories__designation__in'] ?
      categories.filter(cat => cat.designation === queryParams['categories__designation__in']).shift():
      {
        designation : 'All Cateogries',
        isRoot: true,
        children : categories.filter(cat => cat.isRoot)
      }
    })
  export const selectRequestSubjects = createSelector(selectGlobalState,(state) => state.requestSubjects);
  export const selectBreadcrumbArray = createSelector(
    selectCategories,
    selectCategoryQueryParam,
    (categories:Category[],category:Category,props : {product : ProductShort}) => {
      return props.product ? setItems(categories,getItem(categories,props.product.rootCategory)).reverse():
      category ? setItems(categories,category).reverse():null
      //return category ? setItems(categories,category).reverse():null
    })
  export const selectCategoryById = createSelector(selectCategories,
    (categories:Category[],props: {id:number}) => getItem(categories,props.id))
  export const selectFilterForm = createSelector(
    selectFilters,
    (filters: FilterCategory[]) => toFormGroup(filters)
  )

  const getItem = (categories,key:number): Category => {
    return categories.find(category =>  category.id === key);
  }

  const setItems = (categories,param:Category): Category[] => {
    if (param === undefined || param.designation==='All Cateogries') {
      return [];
    }
    const cat = getItem(categories,param.id)
    const parentCategory = getItem(categories,param.parentCategory)
    return([param].concat(setItems(categories,cat.isRoot ? undefined : parentCategory)));
  }



   const toFormGroup = (filtersArray:FilterCategory[]) => {
    const group = {};
    filtersArray.forEach(filterCategorie => {
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
    return new FormGroup(group);
  }
