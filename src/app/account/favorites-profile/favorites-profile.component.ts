import { Component, OnInit } from '@angular/core';
import { ProductShort } from 'src/app/product/model';
import { FavoriteHandlerService } from 'src/app/shared/service/favorite-handler.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { SmcAuthService } from '../service/smc-auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductStoreSelectors, RootStoreState } from 'src/app/root-store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-favorites-profile',
  templateUrl: './favorites-profile.component.html',
  styleUrls: ['./favorites-profile.component.scss'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ transform: 'translateX(0)',
                opacity: 0 }),
        animate('0.2s', style({
                                opacity: 1})),
      ]),
      transition(':leave', [
        animate('0.2s', style({ transform: 'translateX(-200%)' }))
      ])
    ]),
  ]
})
export class FavoritesProfileComponent implements OnInit {
  favorites: Observable<ProductShort[]>;

  constructor(private store$: Store<RootStoreState.State>) { }

  ngOnInit() {
    this.favorites = this.store$.select(ProductStoreSelectors.selectAllProducts);

  }

  // removeFavorite(id) {
  //   this.favorites = this.favorites.filter( x => x.pk !== id);
  //   this.favHandler.addRemoveFavorites(id);
  // }

}
