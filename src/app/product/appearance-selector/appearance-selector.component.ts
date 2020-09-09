import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppearanceVariant, AppSelectorMode } from '../../models/product.models';
import { Observable } from 'rxjs';
import { ProductStoreSelectors } from 'src/app/root-store';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-appearance-selector',
  templateUrl: './appearance-selector.component.html',
  styleUrls: ['./appearance-selector.component.scss']
})
export class AppearanceSelectorComponent implements OnInit {
  @Input() appearanceVariants : AppearanceVariant[]
  @Input() mode? : 'MINIMAL'|'FULL'
  @Output() selectedAppearanceVariant : EventEmitter<AppearanceVariant> = new EventEmitter();
  hoveredAppearanceVariant: AppearanceVariant
  isBigSize$: Observable<boolean>;

  constructor(private store$: Store<any>) { }

  ngOnInit(): void {
    this.setAppearanceVariant(this.appearanceVariants[0])
    this.isBigSize$ = this.store$.select(ProductStoreSelectors.selectIsBigBoxSize)

  }
  setAppearanceVariant(appearanceVariant:AppearanceVariant) {
    this.selectedAppearanceVariant.emit(appearanceVariant);
  }
  setHoveredAppearance(appearanceVariant:AppearanceVariant) {
    this.hoveredAppearanceVariant = appearanceVariant

  }

}
