import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { GlobalStoreSelectors } from 'src/app/root-store/global-store';
import { Category } from 'src/app/core/types';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent implements OnInit {
  rootCategories$: Observable<Category[]>;
  constructor(private store$: Store<RootStoreState.State>) { }

  ngOnInit(): void {
    this.rootCategories$ = this.store$.select(GlobalStoreSelectors.selectRootCategories);
  }

}
