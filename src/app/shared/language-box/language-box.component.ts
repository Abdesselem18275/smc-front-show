import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { LanguageType, UserLanguage } from 'src/app/root-store/global-store/state';
import { SetLanguageAction } from 'src/app/root-store/global-store/actions';
import { selectLanguage } from 'src/app/root-store/global-store/selectors';

@Component({
  selector: 'app-language-box',
  templateUrl: './language-box.component.html',
  styleUrls: ['./language-box.component.scss']
})
export class LanguageBoxComponent implements OnInit {
  language$: Observable<UserLanguage>;
  constructor(private store$: Store<RootStoreState.State>) { }

  ngOnInit() {
    this.language$ = this.store$.select(selectLanguage);
  }

  setLanguage(value: UserLanguage) {
    this.store$.dispatch(SetLanguageAction({key: value}));
  }
}
