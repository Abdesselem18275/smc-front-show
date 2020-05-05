import {Injectable, Inject} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { API_URL } from '../injectables.service';


@Injectable()
export class UniversalInterceptor implements HttpInterceptor  {

  constructor(
              @Inject(API_URL) private apiUrl: string) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // let serverReq: HttpRequest<any> = req;
    // if (this.request) {
    //   let newUrl = req.url ;
    //   if (!req.url.startsWith('/')) {
    //     newUrl += '/';
    //   }
    //   serverReq = req.clone({url: newUrl});
    // }
    return next.handle(req);
  }
}
