import { Directive, ElementRef, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalStoreActions, ParamStoreState } from '../root-store';

@Directive({
  selector: '[appModalClose]'
})
export class ModalCloseDirective {

  constructor(private store$: Store<ParamStoreState.State>,private _element: ElementRef ) { }
  @HostListener('click')
  onClick():void {
    this.store$.dispatch(ModalStoreActions.CloseAllAction());
  }

}
