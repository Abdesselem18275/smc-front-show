import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { UniversalInterceptor } from "./universal-interceptor";
import { UrlBaseCleaner } from "./url-base-cleaner";
import { TokenInjectorInterceptor } from "./token-injector.interceptor";


/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInjectorInterceptor, multi: true },
  ];
