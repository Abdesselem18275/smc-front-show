import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppearanceVariant } from '../../models/product.models';
import { Observable } from 'rxjs';
import { ProductStoreSelectors } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import {AppearanceSelectorStateService} from './appearance-selector-state.service'

@Component({
  selector: 'app-appearance-selector',
  templateUrl: './appearance-selector.component.html',
  styleUrls: ['./appearance-selector.component.scss'],
  providers: [AppearanceSelectorStateService]
})
export class AppearanceSelectorComponent implements OnInit {
  @Input() appearanceVariants : AppearanceVariant[]
  @Input() mode? : 'MINIMAL'|'FULL' = 'FULL'
  @Output() selectedAppearanceVariant : EventEmitter<AppearanceVariant> = new EventEmitter<AppearanceVariant>();
  hoveredAppearanceVariant: AppearanceVariant
  isBigSize$: Observable<boolean>;
  selectedAppearanceVariant$: Observable<AppearanceVariant>

  constructor(private apss : AppearanceSelectorStateService,private store$: Store) {
    this.isBigSize$ = store$.select(ProductStoreSelectors.selectIsBigBoxSize)
    this.selectedAppearanceVariant$ = apss.selectedAppearanceVariant
   }

  ngOnInit(): void {
    this.setAppearanceVariant(this.appearanceVariants[0])
  }
  setAppearanceVariant(appearanceVariant:AppearanceVariant) {
    this.apss.setSelectAppearanceSubject(appearanceVariant);
    this.selectedAppearanceVariant.emit(appearanceVariant);
  }
  setHoveredAppearance(appearanceVariant:AppearanceVariant) {
    this.hoveredAppearanceVariant = appearanceVariant
  }

}
