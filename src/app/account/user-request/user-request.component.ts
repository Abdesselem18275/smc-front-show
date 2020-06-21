import { Component, OnInit } from '@angular/core';
import { RootStoreState, ModalStoreActions } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { AccountFormService } from '../service/account-form.service';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { GlobalStoreSelectors } from 'src/app/root-store/global-store';
import { MinimalProduct } from 'src/app/product/model';
import { ProductDataService } from 'src/app/product/service/product-data.service';

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss']
})
export class UserRequestComponent implements OnInit {
  requestForm: FormGroup;
  subjects$ : Observable<{id:number,designation:string}[]>
  forListProducts$ : Observable<MinimalProduct[]>
  constructor(
    private pds: ProductDataService,
    private accountFormService: AccountFormService,
    private store$: Store<RootStoreState.State>) { }

  ngOnInit(): void {
    this.requestForm = this.accountFormService.createUserRequestForm();
    this.subjects$ = this.store$.select(GlobalStoreSelectors.selectRequestSubjects);
    this.forListProducts$ = this.pds.getForListProducts();
  }
  close() {
    this.store$.dispatch(ModalStoreActions.CloseAllAction());
  }
}
