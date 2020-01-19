import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { LanguageType, UserLanguage } from 'src/app/root-store/global-store/state';
import { SetLanguageAction } from 'src/app/root-store/global-store/actions';
import { selectLanguage } from 'src/app/root-store/global-store/selectors';
import { LANGUAGE_CONFIG } from 'src/app/product/service/config.service';

@Component({
  selector: 'app-language-box',
  templateUrl: './language-box.component.html',
  styleUrls: ['./language-box.component.scss']
})
export class LanguageBoxComponent implements OnInit {
  language$: Observable<UserLanguage>;
  languageList: UserLanguage[];
  constructor(
    @Inject(LANGUAGE_CONFIG) languageList: UserLanguage[],
    private store$: Store<RootStoreState.State>) {
      this.languageList = languageList;
    }

  ngOnInit() {
    console.warn(this.languageList);
    this.language$ = this.store$.select(selectLanguage);
  }

  setLanguage(value: UserLanguage) {
    window.location.href = value.id.toLowerCase() + '/';
    this.store$.dispatch(SetLanguageAction({key: value}));
  }
}
