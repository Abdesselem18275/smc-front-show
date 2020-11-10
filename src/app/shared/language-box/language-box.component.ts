import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserLanguage } from 'src/app/root-store/global-store/state';
import { selectLanguage } from 'src/app/root-store/global-store/selectors';

import { SUPPORTED_LANGUAGES } from 'src/app/injectables';

@Component({
  selector: 'app-language-box',
  templateUrl: './language-box.component.html',
  styleUrls: ['./language-box.component.scss']
})
export class LanguageBoxComponent {
  language$: Observable<UserLanguage>;
  languageList: UserLanguage[];
  isSideNav$: Observable<boolean>;
  constructor(
    @Inject(SUPPORTED_LANGUAGES) languageList: UserLanguage[],
    private store$: Store<any>) {
      this.languageList = languageList;
      this.language$ = this.store$.select(selectLanguage);
    }
  getHref(localId:string) {
    return '/'+localId
  }
}
