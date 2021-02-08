import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentification-dialog',
  templateUrl: './authentification-dialog.component.html',
  styleUrls: ['./authentification-dialog.component.scss']
})
export class AuthentificationDialogComponent implements OnInit {
  isLogin = true;
  constructor() { }

  ngOnInit(): void {
  }
  toggleDialogMode(): void {
    this.isLogin = !this.isLogin;
  }

}
