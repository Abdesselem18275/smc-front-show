import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SUPPORTED_LANGUAGES } from 'src/app/injectables';
import { Country, Currency } from 'src/app/models/shared.models';
import { UserLanguage } from 'src/app/root-store/global-store/state';
import { GlobalStateService } from '../../state/global-state.service';

@Component({
  selector: 'app-locales-dialog',
  templateUrl: './locales-dialog.component.html',
  styleUrls: ['./locales-dialog.component.scss']
})
export class LocalesDialogComponent implements OnInit {
  languageList: UserLanguage[];
  countries$: Observable<Country[]>;
  currencies$: Observable<Currency[]>;
  constructor(
    private gss: GlobalStateService,
    @Inject(SUPPORTED_LANGUAGES) languageList: UserLanguage[]) {
    this.languageList = languageList;
    this.countries$ = this.gss.countries;
    this.currencies$ = this.gss.currencies;
   }

  ngOnInit(): void {
  }
  confirm(){

  }
}
