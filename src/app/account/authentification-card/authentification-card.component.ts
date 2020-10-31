import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserStoreSelectors } from 'src/app/root-store/user-store';

@Component({
  selector: 'app-authentification-card',
  templateUrl: './authentification-card.component.html',
  styleUrls: ['./authentification-card.component.scss']
})
export class AuthentificationCardComponent implements OnInit {
  isChecking: Observable<boolean>;

  constructor(private store$: Store<any>) { }

  ngOnInit(): void {
    this.isChecking = this.store$.select(UserStoreSelectors.selectIsLoading);

  }
}
