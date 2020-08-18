import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { filter, map, tap } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { centerSlideInAnimation, sideSlideInAnimation, expandAnimation } from 'src/app/animations';
import { Store } from '@ngrx/store';
import { RootStoreState, ModalStoreState } from 'src/app/root-store';
import { selectAllModalState } from 'src/app/root-store/modal-store/selectors';
import { ToggleAction, ToggleUserCard } from 'src/app/root-store/modal-store/actions';
import { Observable } from 'rxjs';;
import { UserStoreSelectors } from 'src/app/root-store/user-store';
import { ModalRoute } from 'src/app/models/shared.models';

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.scss'],
})
export class ProductMenuComponent implements OnInit {
  modalRoute = ModalRoute;
  modalStore$: Observable<ModalStoreState.State>;
  isHomeRoute$: Observable<boolean>;
  favoritesCount$ : Observable<number>;
  @Output() isSideMenuActiveEvent: EventEmitter<boolean> = new EventEmitter();
  constructor( private router: Router,
               private store$: Store<RootStoreState.State>) {


  }
  ngOnInit() {
    this.modalStore$ = this.store$.select(selectAllModalState);
    this.isHomeRoute$ = this.router.events.pipe(
      filter(x => x instanceof NavigationEnd),
      map(event => event['url'] === '/miscellaneous/home'));
    this.favoritesCount$ = this.store$.select(UserStoreSelectors.selectFavoritesCount)
  }

  toggleModal(value) {
    this.store$.dispatch(ToggleAction({key: value}));
  }
  toggleUserCard() {
    this.store$.dispatch(ToggleUserCard());
    }
}
