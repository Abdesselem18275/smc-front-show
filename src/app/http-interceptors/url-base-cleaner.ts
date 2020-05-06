import {Injectable, Inject, Optional} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';


@Injectable()
export class UrlBaseCleaner implements HttpInterceptor  {
    intercept(req: HttpRequest<any>, next: HttpHandler)  {
        //console.warn(req.urlWithParams);
        return next.handle(req);
    }
}