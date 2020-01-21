import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { LanguageType, UserLanguage } from 'src/app/root-store/global-store/state';
import { SetLanguageAction } from 'src/app/root-store/global-store/actions';
import { selectLanguage } from 'src/app/root-store/global-store/selectors';
import { LANGUAGE_CONFIG } from 'src/app/product/service/config.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-language-box',
  templateUrl: './language-box.component.html',
  styleUrls: ['./language-box.component.scss']
})
export class LanguageBoxComponent implements OnInit {
  language$: Observable<UserLanguage>;
  languageList: UserLanguage[];
  constructor(
    @Inject(APP_BASE_HREF) private app_base_href: string,
    private languageService: LanguageService,
    @Inject(LANGUAGE_CONFIG) languageList: UserLanguage[],
    private store$: Store<RootStoreState.State>) {
      this.languageList = languageList;
    }

  ngOnInit() {
    console.warn(this.languageList);
    this.language$ = this.store$.select(selectLanguage);
  }

  setLanguage(value: UserLanguage) {
    this.languageService.languageId = value.id.toLowerCase() + '/';
    console.warn(this.languageService.languageId);
    console.warn(this.app_base_href);
    this.store$.dispatch(SetLanguageAction({key: value}));
  }
}
