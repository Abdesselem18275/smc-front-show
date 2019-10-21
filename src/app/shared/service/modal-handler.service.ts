import { Injectable } from '@angular/core';
import { MdcSnackbar } from '@angular-mdc/web';
import { BehaviorSubject } from 'rxjs';
import { ModalStateStore } from '../token';
import { AuthService } from 'src/app/account/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ModalHandlerService {
  modalStateStore = new ModalStateStore();
  ModalToggeler$ = new BehaviorSubject<ModalStateStore>(this.modalStateStore);

  constructor(private authService: AuthService, private snackbar: MdcSnackbar ) {
    console.warn('Initialisation');
   }


  openSnak(message?: string, action: string = ' ') {
    const snackbar = this.snackbar.open(message, action, {
      dismiss: true,
    });
    return snackbar;
  }

  closeAll() {
    this.modalStateStore = new ModalStateStore();
    this.ModalToggeler$.next(this.modalStateStore );
  }

  toggleModal(key: string) {
    const tempKey = key;
    key = tempKey === 'userCardBox' ? this.authService.isLogged() ? key : 'loginBox' : key;
    const tempModalStateStore = this.modalStateStore;
    this.modalStateStore = new ModalStateStore();
    this.modalStateStore[key] =  !tempModalStateStore[key];
    this.ModalToggeler$.next(this.modalStateStore);
  }


}
