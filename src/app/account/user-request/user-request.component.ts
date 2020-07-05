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
import { UserStoreSelectors } from 'src/app/root-store/user-store';
import { SmcAuthService } from '../service/smc-auth.service';
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
    private sas :SmcAuthService,
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
  close() {
    this.store$.dispatch(ModalStoreActions.CloseAllAction());
  }
  toggle(key) {
    this.formContainerState[key] = !this.formContainerState[key]
  }
  submit() {
    this.sas.PutUserRequest(JSON.stringify(this.requestForm.value)).subscribe(
      x => {
        this.store$.dispatch(ModalStoreActions.CloseAllAction())
        this.snakBar.open('your request was successfully submitted . You will soon soon answer you via your email adress')

      },
      err => console.warn(err)
    )
  }
}
