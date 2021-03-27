import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {AppDataService} from './app-data.service';
import { exhaustMap, take, tap } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuDataBuilderService } from './menu-data-builder.service';
import { GlobalStoreActions } from 'src/app/root-store/global-store';
import { PROFILE_ID } from 'src/app/injectables';
import { Profile } from 'src/app/models/account.models';
import { combineLatest, EMPTY } from 'rxjs';
import { UserStoreActions } from 'src/app/root-store/user-store';
import { LanguageType } from 'src/app/root-store/global-store/state';
import { BaseImage, Category } from 'src/app/models/product.models';
import { GlobalStateService } from '../state/global-state.service';
import { LocaleInitData } from 'src/app/models/shared.models';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(
    private gss: GlobalStateService,
    @Inject(PROFILE_ID) private profileId: string,
    private iconRegistry: MatIconRegistry ,
    private sanitizer: DomSanitizer,
    private http: HttpClient ,
    private mdbs: MenuDataBuilderService,
    private store$: Store<any>,
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
      exhaustMap(() => localStorage.getItem(this.profileId) ?
      this.ads.get<Profile>(`/account/profiles/${localStorage.getItem(this.profileId)}/`).pipe(
        take(1),
        tap((profile: Profile) =>
          this.store$.dispatch(UserStoreActions.LoadUserAction({payload:profile}))
        )):EMPTY
      ),
      exhaustMap(() => combineLatest([
        this.ads.get<Category[]>(`/api/product/categories/`),
        this.ads.get<BaseImage[]>(`/api/product/icons/`)
      ]).pipe(
        take(1),
        tap((res: [Category[],BaseImage[]]) =>{
        res[1].forEach(jsonItem => {
          this.iconRegistry.addSvgIcon(jsonItem.designation, this.sanitizer.bypassSecurityTrustResourceUrl(jsonItem.content));
        });
          this.store$.dispatch(GlobalStoreActions.loadInitDataAction({payload:{
            categories : res[0],
            navMenuTree : this.mdbs.buildMenuTree(res[0].filter((cat: Category) => cat.isRoot))
          }}));
      }))
      ),
      ).toPromise().then();
  }
}
