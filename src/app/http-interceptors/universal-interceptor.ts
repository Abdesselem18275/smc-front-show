import {Injectable, Inject, Optional} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import {Request} from 'express';
import {REQUEST} from '@nguniversal/express-engine/tokens';
import { API_URL } from '../injectables.service';


@Injectable()
export class UniversalInterceptor implements HttpInterceptor  {

  constructor(@Optional() @Inject(REQUEST) protected request: Request,
              @Inject(API_URL) private apiUrl: string) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let serverReq: HttpRequest<any> = req; 
    if (this.request) {
      Object.keys(req).map(key => {
        console.warn(key);
        console.warn(req[key]);
      })
      let newUrl = req.url ;
      if (!req.url.startsWith('/')) {
        newUrl += '/';
      }
      //newUrl += req.url;
      serverReq = req.clone({url: newUrl});
      console.warn(newUrl)
    }
    console.warn(req.url);
    return next.handle(req);
  }
}
