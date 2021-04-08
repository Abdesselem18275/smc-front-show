import { Component, Inject } from '@angular/core';
 
import { Observable } from 'rxjs';
import { SUPPORTED_LANGUAGES } from 'src/app/injectables';
import { UserLanguage } from 'src/app/models/shared.models';
import { GlobalStateService } from 'src/app/shared/state/global-state.service';

@Component({
  selector: 'app-language-box',
  templateUrl: './language-box.component.html',
  styleUrls: ['./language-box.component.scss']
})
export class LanguageBoxComponent {
  language$: Observable<UserLanguage | null>;
  languageList: UserLanguage[];
  constructor(
    @Inject(SUPPORTED_LANGUAGES) languageList: UserLanguage[],
    private gss:GlobalStateService) {
      this.languageList = languageList;
      this.language$ = this.gss.selectedLanguage
    }
  getHref(localId: string) {
    return '/'+localId;
  }
}
