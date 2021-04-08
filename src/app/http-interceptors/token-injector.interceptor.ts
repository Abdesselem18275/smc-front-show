/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TOKEN_KEY } from '../injectables';
import { AuthService } from 'src/app/shared/services/auth.service';
 

@Injectable()
export class TokenInjectorInterceptor implements HttpInterceptor {

  constructor(
    private as : AuthService,
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.as.token
    request = this.as.isLogged && request.url.includes('/api/') ? request.clone({
      headers:request.headers.set('Authorization','Token ' + token)
    }):request;
    return next.handle(request);
  }
}
