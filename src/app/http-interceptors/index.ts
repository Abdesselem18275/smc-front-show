import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocaleInterceptor } from './locale.interceptor';
import { TokenInjectorInterceptor } from './token-injector.interceptor';


/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LocaleInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInjectorInterceptor, multi: true },
  ];
