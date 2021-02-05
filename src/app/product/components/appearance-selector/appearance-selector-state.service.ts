import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppearanceVariant } from 'src/app/models/product.models';

@Injectable()
export class AppearanceSelectorStateService {
  private selectAppearanceSubject = new BehaviorSubject<AppearanceVariant>(null)
  selectedAppearance$ = this.selectAppearanceSubject.asObservable()
  constructor() { }
  setSelectAppearanceSubject(payload : AppearanceVariant):void {
    this.selectAppearanceSubject.next(payload)
  }
  get selectedAppearanceVariant():Observable<AppearanceVariant> {
    return this.selectedAppearance$
  }
}
