import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { UniversalInterceptor } from "./universal-interceptor";


/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: UniversalInterceptor, multi: true },
  ];
  