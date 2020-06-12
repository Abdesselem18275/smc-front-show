import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppearanceVariant } from '../model';
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
  @Output() selectedAppearanceVariant : EventEmitter<AppearanceVariant> = new EventEmitter();
  private _selectedAppearanceVariant :AppearanceVariant
  hoveredAppearanceVariant: AppearanceVariant
  isBigSize$: Observable<boolean>;

  constructor(private store$: Store<any>) { }

  ngOnInit(): void {
    this.setAppearanceVariant(this.appearanceVariants[0])
    this.isBigSize$ = this.store$.select(ProductStoreSelectors.selectIsBigBoxSize)

  }
  setAppearanceVariant(appearanceVariant:AppearanceVariant) {
    this._selectedAppearanceVariant = appearanceVariant
    this.selectedAppearanceVariant.emit(appearanceVariant);
  }
  setHoveredAppearance(appearanceVariant:AppearanceVariant) {
    this.hoveredAppearanceVariant = appearanceVariant

  }

}
