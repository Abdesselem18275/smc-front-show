import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { filter, map, take } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootStoreState, ModalStoreState } from 'src/app/root-store';
import { selectAllModalState } from 'src/app/root-store/modal-store/selectors';
import { ToggleAction, ToggleUserCard } from 'src/app/root-store/modal-store/actions';
import { Observable } from 'rxjs';
import { ModalRoute } from 'src/app/models/shared.models';
import { MatDialog } from '@angular/material/dialog';
import { AccountCardComponent } from '../account-card/account-card.component';
import { UserStoreActions, UserStoreSelectors } from 'src/app/root-store/user-store';
import { SearchBoxComponent } from '../search-box/search-box.component';

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.scss'],
})
export class ProductMenuComponent implements OnInit {
  modalRoute = ModalRoute;
  modalStore$: Observable<ModalStoreState.State>;
  isHomeRoute$: Observable<boolean>;
  @Output()
  sideNavEmmiter = new EventEmitter<any>();
  @Output() isSideMenuActiveEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor( private router: Router,
               private dialog: MatDialog,
               private store$: Store<RootStoreState.State>) {


  }
  ngOnInit():void {
    this.modalStore$ = this.store$.select(selectAllModalState);
    this.isHomeRoute$ = this.router.events.pipe(
      filter(x => x instanceof NavigationEnd),
      map(event => event['url'] === '/miscellaneous/home'));
  }
  toggleSideNav() {
    this.sideNavEmmiter.emit('')
  }
  openCardDialog() {
    this.store$.select(UserStoreSelectors.selectIsAuthentificated).pipe(
      take(1)
    ).subscribe(x => x ?
      this.dialog.open(AccountCardComponent,{
        position: {top:'5rem',right:'1rem'},
        width:'20rem'
      }):
      this.store$.dispatch(UserStoreActions.RedirectForAuthentification(
         {redirectUrl:this.router.url}
      )))

  }
  openSearchDialog() {
    this.dialog.open(SearchBoxComponent,{
      position: {top:'0',right:'0'},
      width:'100vw',
      maxWidth:'100vw',
      hasBackdrop:false,
    })

  }
  toggleModal(value:string):void {
    this.store$.dispatch(ToggleAction({key: value}));
  }
}
