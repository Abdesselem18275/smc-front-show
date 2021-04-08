import { Injectable, Inject } from '@angular/core';
import {AppDataService} from './app-data.service';
import { exhaustMap, take, tap } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { PROFILE_ID, SUPPORTED_LANGUAGES } from 'src/app/injectables';
import { ApiProfile, Profile } from 'src/app/models/account.models';
import { combineLatest, EMPTY } from 'rxjs';
import { ApiCategory, BaseImage, Category } from 'src/app/models/product.models';
import { GlobalStateService } from '../state/global-state.service';
import { LanguageType, LocaleInitData, UserLanguage } from 'src/app/models/shared.models';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AccountStateService } from 'src/app/shared/state/account-state.service';



@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(
    @Inject(SUPPORTED_LANGUAGES) private languageList: UserLanguage[],
    @Inject('APP_BASE_HREF') private baseUrl: string,
    @Inject(PROFILE_ID) private profileId: string,
    private iconRegistry: MatIconRegistry ,
    private sanitizer: DomSanitizer,
    private http: HttpClient ,
    private as : AuthService,
    private ass : AccountStateService,
    private gss : GlobalStateService,
    private ads: AppDataService ) {
      iconRegistry.addSvgIcon('loading', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/loading_logo.svg'))
      .addSvgIcon('loading_2', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/loader_2.svg'))
      .addSvgIcon('logo_mini', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/logo_smc_mini.svg'))
      .addSvgIcon('logo_full_white', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/logo_full_white.svg'))
      .addSvgIcon(LanguageType.GERMAN, sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/germany.svg'))
      .addSvgIcon(LanguageType.FRENCH, sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/france.svg'))
      .addSvgIcon(LanguageType.ENGLISH, sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/united-kingdom.svg'))
      .addSvgIcon('landing-page-illustration', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/Illustration-landing-page.svg'))
      .addSvgIcon('facebook', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/facebook.svg'))
      .addSvgIcon('instagram', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/insta.svg'))
      .addSvgIcon('contact-us', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/contact_us_illustration.svg'))
      .addSvgIcon('logo_black_bg', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/logo_black_background.svg'));
      const language = this.baseUrl.replace(/\//g, '');
      const selectedLanguage = this.languageList.filter(lang => lang.id === language)[0]
      this.gss.setSelectedLanguage(selectedLanguage)

    }

  init(): Promise<void> {
    return this.ads.get<LocaleInitData>('/locale/init/').pipe(
      take(1),
      tap((res: LocaleInitData) => {
        this.gss.setCountries(res.countries);
        this.gss.setCurrencies(res.currencies);
      }),
      exhaustMap(() =>
        this.http.get<{country: string}>('https://yhph57qw9k.execute-api.eu-central-1.amazonaws.com/dev').pipe(
          take(1),
          tap(country => {
            this.gss.initUserLocales(country.country);
          })
        )),
      exhaustMap(() => combineLatest([
        this.ads.get<ApiCategory[]>(`/api/product/categories/`),
        this.ads.get<BaseImage[]>(`/api/product/icons/`)
      ]).pipe(
        take(1),
        tap((res: [ApiCategory[],BaseImage[]]) =>{
        res[1].forEach(jsonItem => {
          this.iconRegistry.addSvgIcon(jsonItem.designation, this.sanitizer.bypassSecurityTrustResourceUrl(jsonItem.content));
        });
        const categories = res[0].map(cat => new Category(cat))
        this.gss.setCategories(categories)
      }))
      ),
      exhaustMap(() => this.as.isLogged ?
      this.ads.get<ApiProfile>(`/account/profiles/auth_user/`).pipe(
        take(1),
        tap((res : ApiProfile) =>
          this.ass.setAuthProfile(new Profile(res))
        )):EMPTY
      ),
      ).toPromise().then();
  }
}
