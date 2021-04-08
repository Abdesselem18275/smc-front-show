import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN_KEY } from 'src/app/injectables';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _redirectUrl: string;
  constructor(

    @Inject(TOKEN_KEY) private tokenKey: string, 
    private router : Router) { 
    this._redirectUrl ='/product'
  }

  get isLogged():boolean {
    return localStorage.getItem(this.tokenKey) !== null;
  }
  logout():void {
    localStorage.removeItem(this.tokenKey)
  }
  get token(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }
  set token(payload:string) {
    localStorage.setItem(this.tokenKey,payload)
  }

  public get redirectUrl(): string {
    return this._redirectUrl;
  }
  public set redirectUrl(value: string) {
    this._redirectUrl = value;
  }
  redirect(redirectUrl?: string) {
    if (this.isLogged) {
      this.router.navigateByUrl(redirectUrl ? redirectUrl : '/product/list');
    } else {
      this.router.navigateByUrl('product/list',{skipLocationChange:false});
    }
  }


}
