import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { LanguageType, UserLanguage } from 'src/app/root-store/global-store/state';
import { SetLanguageAction } from 'src/app/root-store/global-store/actions';
import { selectLanguage } from 'src/app/root-store/global-store/selectors';
import { Router } from '@angular/router';
import { inject } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { LanguageService } from '../service/language.service';
import { LANGUAGE_CONFIG } from 'src/app/injectables.service';

@Component({
  selector: 'app-language-box',
  templateUrl: './language-box.component.html',
  styleUrls: ['./language-box.component.scss']
})
export class LanguageBoxComponent implements OnInit {
  language$: Observable<UserLanguage>;
  languageList: UserLanguage[];
  constructor(
    private languageService: LanguageService,
    @Inject(LANGUAGE_CONFIG) languageList: UserLanguage[],
    private store$: Store<RootStoreState.State>) {
      this.languageList = languageList;
    }

  ngOnInit() {
    this.language$ = this.store$.select(selectLanguage);
  }

  setLanguage(value: UserLanguage) {
    this.languageService.languageId = value.id.toLowerCase() + '/';
    this.store$.dispatch(SetLanguageAction({key: value}));
  }
}
