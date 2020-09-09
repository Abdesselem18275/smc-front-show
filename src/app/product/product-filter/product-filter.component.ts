import { Component, OnInit} from '@angular/core';
import { FormGroup} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ParamStoreState } from 'src/app/root-store/param-store';
import { FilterCategory } from '../../models/product.models';
import { Observable } from 'rxjs';
import { GlobalStoreSelectors } from 'src/app/root-store/global-store';



@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {

  filterForm$: Observable<FormGroup>;
  filterCategories$: Observable<FilterCategory[]> ;
  selectedFilter = '';
  isScrollOver: boolean;
  isScrollable: boolean;
  isActive: boolean;

  constructor(private store$: Store<ParamStoreState.State>) {
   }

  ngOnInit():void {
        this.filterForm$ = this.store$.select(GlobalStoreSelectors.selectFilterForm)
        this.filterCategories$ = this.store$.select(GlobalStoreSelectors.selectFilters)
        // this.onChanges();
  }


//   onChanges(): void {
//     Object.keys(this.filterForm.controls).forEach(key => {
//       this.filterForm.get(key).valueChanges.pipe(
//         debounceTime(1000)).subscribe( tempForm  => {
//           const reqArray = [];
//           for (const property in tempForm) {
//             if (tempForm[property]) {
//               reqArray.push(property.substr(property.lastIndexOf('_') + 1));
//             }
//           }
//         const param = {
//            key: key,
//            value: reqArray.join(','),
//            type : ParamType.FILTER
//          };
//         this.store$.dispatch(AddOrUpdateAction({param : param}));
//     });
//   }) ;
//   this.fbs.filterForm = this.filterForm;
// }

  // clearFilter() {
  //   Object.keys(this.filterForm.controls).forEach( (key: string) => {
  //     const tempForm_ = <FormGroup>this.filterForm.get(key);
  //      Object.keys(tempForm_.controls).filter(y =>  tempForm_.get(y).setValue(false) );
  //   });
  // }
  toggleFilter(i:string):void {
    this.selectedFilter === i ? this.selectedFilter = '' : this.selectedFilter = i;
  }
  toggleActive():void {
    this.isActive = !this.isActive;
  }
}
