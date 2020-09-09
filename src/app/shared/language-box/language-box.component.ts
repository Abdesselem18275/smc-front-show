import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState, ModalStoreSelectors } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { UserLanguage } from 'src/app/root-store/global-store/state';
import { selectLanguage } from 'src/app/root-store/global-store/selectors';

import { LANGUAGE_CONFIG } from 'src/app/injectables.service';

@Component({
  selector: 'app-language-box',
  templateUrl: './language-box.component.html',
  styleUrls: ['./language-box.component.scss']
})
export class LanguageBoxComponent implements OnInit {
  language$: Observable<UserLanguage>;
  languageList: UserLanguage[];
  isSideNav$: Observable<boolean>;
  constructor(
    @Inject(LANGUAGE_CONFIG) languageList: UserLanguage[],
    private store$: Store<RootStoreState.State>) {
      this.languageList = languageList;
    }

  ngOnInit():void {
    this.language$ = this.store$.select(selectLanguage);
    this.isSideNav$ = this.store$.select<boolean>(
      ModalStoreSelectors.selectModalStateByType,{key : 'sideMenuBox'}
      )
  }

  setLanguage(value: UserLanguage):void {
    //this.languageService.languageId = value.id.toLowerCase() + '/';
    //this.store$.dispatch(SetLanguageAction({key: value}));
  }
}
