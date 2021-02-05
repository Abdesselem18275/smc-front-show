import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Country, Currency } from 'src/app/models/shared.models';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  private readonly countriesSubject = new BehaviorSubject<Country[]>([]);
  private readonly currenciesSubject = new BehaviorSubject<Currency[]>([]);

  constructor() { }
  setCurrencies(payload: Currency[]): void {
    this.currenciesSubject.next(payload);
  }
  get currencies(): Observable<Currency[]> {
    return this.currenciesSubject.asObservable();
  }
  setCountries(payload: Country[]): void {
    this.countriesSubject.next(payload);
  }
  get countries(): Observable<Country[]> {
    return this.countriesSubject.asObservable();
  }
}
