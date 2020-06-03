import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppearanceVariant } from '../model';

@Component({
  selector: 'app-appearance-selector',
  templateUrl: './appearance-selector.component.html',
  styleUrls: ['./appearance-selector.component.scss']
})
export class AppearanceSelectorComponent implements OnInit {
  @Input() appearanceVariants : AppearanceVariant[] 
  @Output() selectedAppearanceVariant : EventEmitter<AppearanceVariant> = new EventEmitter();
  private _selectedAppearanceVariant :AppearanceVariant
  constructor() { }

  ngOnInit(): void {
    this.setAppearanceVariant(this.appearanceVariants[0])
  }
  setAppearanceVariant(appearanceVariant:AppearanceVariant) {
    this._selectedAppearanceVariant = appearanceVariant
    this.selectedAppearanceVariant.emit(appearanceVariant);
  }

}
