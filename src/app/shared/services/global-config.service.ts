import { Injectable, Inject } from '@angular/core';
import { UserLanguage } from 'src/app/root-store/global-store/state';
import { SUPPORTED_LANGUAGES } from 'src/app/injectables';

@Injectable({
  providedIn: 'root'
})
export class GlobalConfigService {

  constructor(
    @Inject(SUPPORTED_LANGUAGES) private languageList: UserLanguage[],
    @Inject('APP_BASE_HREF') private baseUrl: string) { }

  getInitialGlobalConfig() {
    const language = this.baseUrl.replace(/\//g, '');
    const selectedLanguage = this.languageList.filter(lang => lang.id === language)[0]
    return  {
      language : selectedLanguage,
      categories: [],
      filters: [],
      navMenuTree: [],
      requestSubjects: []
    }

  }
}
