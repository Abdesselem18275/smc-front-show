import { Component, OnInit } from '@angular/core';
import { RootStoreState, ModalStoreActions, ProductStoreSelectors } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { AccountFormService } from '../service/account-form.service';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { GlobalStoreSelectors } from 'src/app/root-store/global-store';
import { MinimalProduct } from 'src/app/product/model';
import { ProductDataService } from 'src/app/product/service/product-data.service';
import { take, map, tap } from 'rxjs/operators';
import { verticalAccordionAnimation } from 'src/app/animations';

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss']
})
export class UserRequestComponent implements OnInit {
  requestForm: FormGroup;
  subjects$ : Observable<{id:number,designation:string}[]>
  forListProducts$ : Observable<MinimalProduct[]>
  selectedProduct$ : Observable<any>
  isSubjectsContainerOpen : boolean;
  selectedProductsCount : number = 0;
  selectedSubjectsCount : number = 0;

  constructor(
    private pds: ProductDataService,
    private accountFormService: AccountFormService,
    private store$: Store<RootStoreState.State>) { }

  ngOnInit(): void {
    this.isSubjectsContainerOpen = true;
    this.requestForm = this.accountFormService.createUserRequestForm();
    this.subjects$ = this.store$.select(GlobalStoreSelectors.selectRequestSubjects);
    this.forListProducts$ = this.pds.getForListProducts();
    this.store$.select(ProductStoreSelectors.selectSelectedProduct).pipe(
      take(1),
      tap((product) => {
        this.requestForm.get('related_products').setValue(product.id)
      })).subscribe(x => console.warn(x))
    this.requestForm.valueChanges.subscribe(x => {
      this.selectedProductsCount = x.related_products.length
      this.selectedSubjectsCount = x.subjects.length
    })
  }
  close() {
    this.store$.dispatch(ModalStoreActions.CloseAllAction());
  }
  toggle() {
    this.isSubjectsContainerOpen =!this.isSubjectsContainerOpen

  }
}
