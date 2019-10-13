import { Injectable } from '@angular/core';
import { MdcSnackbar } from '@angular-mdc/web';



@Injectable({
  providedIn: 'root'
})
export class ModalHandlerService {

  constructor(private snackbar: MdcSnackbar ) { }


  openModal(message?: string, action: string = ' ') {
    const snackbar = this.snackbar.open(message, action, {
      dismiss: true,
    });
    return snackbar;
  }
}
