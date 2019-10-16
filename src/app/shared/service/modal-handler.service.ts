import { Injectable } from '@angular/core';
import { MdcSnackbar } from '@angular-mdc/web';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ModalHandlerService {

  profileCardToggeler = new Subject<boolean>();

  constructor(private snackbar: MdcSnackbar ) { }


  openModal(message?: string, action: string = ' ') {
    const snackbar = this.snackbar.open(message, action, {
      dismiss: true,
    });
    return snackbar;
  }

  closeAll() {
    this.profileCardToggeler.next(false);
  }

  openProfileCard() {
    this.profileCardToggeler.next(true);
  }


}
