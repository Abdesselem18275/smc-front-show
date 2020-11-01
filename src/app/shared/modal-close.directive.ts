import { Directive, ElementRef, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalStoreActions } from '../root-store';

@Directive({
  selector: '[appModalClose]'
})
export class ModalCloseDirective {

  constructor(private store$: Store<any>,private _element: ElementRef ) { }
  @HostListener('click')
  onClick():void {
    this.store$.dispatch(ModalStoreActions.CloseAllAction());
  }

}
