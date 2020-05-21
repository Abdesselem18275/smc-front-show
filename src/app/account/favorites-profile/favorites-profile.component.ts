import { Component, OnInit } from '@angular/core';
import { ProductShort } from 'src/app/product/model';
import { trigger, transition, style, animate } from '@angular/animations';
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
        style({opacity: 0 }),
        animate('0.2s', style({ opacity: 1}))
      ]),
      transition(':leave', [
        animate('0.1s', style({ opacity: 0}))
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
}
