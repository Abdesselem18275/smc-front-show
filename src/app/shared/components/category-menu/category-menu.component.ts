import { Observable } from 'rxjs';
import { Category } from 'src/app/models/product.models';
import { Component, OnInit } from '@angular/core';
import { GlobalStateService } from 'src/app/shared/state/global-state.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent implements OnInit {
  rootCategories$: Observable<Category[]>;
  constructor(private gss: GlobalStateService) { }

  ngOnInit(): void {
    this.rootCategories$ = this.gss.categories.pipe(
      map(
        categories => categories.filter(cat => cat.isRoot)))

  }

}
