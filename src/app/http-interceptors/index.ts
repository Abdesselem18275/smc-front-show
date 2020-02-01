import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { UniversalInterceptor } from "./universal-interceptor";
import { UrlBaseCleaner } from "./url-base-cleaner";


/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: UrlBaseCleaner, multi: true },
  ];
