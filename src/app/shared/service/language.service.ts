import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  _languageId: string;
  constructor() { }

  set languageId(id: string) {
    this._languageId = id;
  }
  get languageId() {
    return this._languageId;
  }
}
