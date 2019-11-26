import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalStateStore } from '../token';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SmcAuthService } from 'src/app/account/service/smc-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ModalHandlerService {
  modalStateStore = new ModalStateStore();
  ModalToggeler$ = new BehaviorSubject<ModalStateStore>(this.modalStateStore);

  constructor(private authService: SmcAuthService,
              private snackbar: MatSnackBar ,
              private router: Router ) {
    this.router.events.pipe(filter( event => event instanceof NavigationEnd)).subscribe(() => {
      this.closeAll();
    });

   }



  openSnak(message: string, action?: string) {
    const snackbar = this.snackbar.open(message, action);
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
