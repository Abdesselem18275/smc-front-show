import { Component, OnInit } from '@angular/core';
import { RootStoreState, ModalStoreActions, ProductStoreSelectors } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { AccountFormService } from '../service/account-form.service';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { GlobalStoreSelectors } from 'src/app/root-store/global-store';
import { MinimalProduct } from 'src/app/models/product.models';
import { map } from 'rxjs/operators';
import { UserStoreActions, UserStoreSelectors } from 'src/app/root-store/user-store';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface FormContainerState {
  isSubjectsContainerOpen :boolean
  isProductListContainerOpen:boolean
  isTextContainerOpen:boolean
}
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
  formContainerState : FormContainerState = {
    isSubjectsContainerOpen : false,
    isProductListContainerOpen: false,
    isTextContainerOpen: false
  }

  selectedProductsCount : number = 0;
  selectedSubjectsCount : number = 0;

  constructor(
    private snakBar: MatSnackBar,
    private accountFormService: AccountFormService,
    private store$: Store<RootStoreState.State>) { }

  ngOnInit(): void {
    this.requestForm = this.accountFormService.createUserRequestForm();
    this.subjects$ = this.store$.select(GlobalStoreSelectors.selectRequestSubjects);

    this.forListProducts$ = this.store$.select(UserStoreSelectors.selectUser).pipe(map(user => user.favorites))
    this.selectedProduct$ = this.store$.select(ProductStoreSelectors.selectSelectedProduct)
    this.requestForm.valueChanges.subscribe(x => {
      this.selectedProductsCount = x.related_products.length
      this.selectedSubjectsCount = x.subjects.length
    })
  }

  toggle(key) {
    Object.keys(this.formContainerState).forEach(x => {
      this.formContainerState[x] =  x === key ? !this.formContainerState[x] : false
    })
  }
  submit() {
    this.store$.dispatch(UserStoreActions.LoadUserRequestsAction({payload : this.requestForm.getRawValue()}))
  }
}
