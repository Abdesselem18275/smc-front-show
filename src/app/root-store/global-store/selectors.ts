import * as fromGlobalReducer from './reducers';
import { createFeatureSelector, createSelector, props } from '@ngrx/store';
import { State } from './state';
import { Category,ProductLong, ProductShort, FilterCategory } from 'src/app/product/model';
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
      return queryParams['categories__designation__in'] && queryParams['categories__designation__in'] !== '' ?
      categories.filter(cat => cat.designation === queryParams['categories__designation__in']).shift():
      {
        designation : 'All products',
        isRoot: true,
        children : categories.filter(cat => cat.isRoot)
      }
    })

  export const selectBreadcrumbArray = createSelector(
    selectCategories,
    selectCategoryQueryParam,
    (categories:Category[],category:Category,props : {product : ProductLong | ProductShort}) => {
      // console.warn(props.product ?props.product:null)
      // console.warn(category ?category:null)
      return props.product ? setItems(categories,getItem(categories,props.product.rootCategory)).reverse():
      category ? setItems(categories,category).reverse():null
    })

  export const selectFilterForm = createSelector(
    selectFilters,
    (filters: FilterCategory[]) => toFormGroup(filters)
  )




  const getItem = (categories,designation:string): Category => {
    return categories.find(category => category.designation === designation);
  }

  const setItems = (categories,param:Category): Category[] => {
    console.warn(param);
    if (param === undefined || param.designation==="All products") {
      return [];
    }
    const cat = getItem(categories,param.designation)
    return([param].concat(setItems(categories,cat.isRoot ? undefined : cat.parentCategory)));
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