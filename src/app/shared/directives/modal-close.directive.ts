import { Directive, ElementRef, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Directive({
  selector: '[appModalClose]'
})
export class ModalCloseDirective {

  constructor(private matDialog : MatDialog,private _element: ElementRef ) { }
  @HostListener('click')
  onClick():void {
    this.matDialog.closeAll()
  }

}
