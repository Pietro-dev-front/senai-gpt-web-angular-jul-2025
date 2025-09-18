import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Router } from '@angular/router';

import { routes } from './app.routes';
import { HttpErrorResponse, HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
export const authInterceptor: HttpInterceptorFn=(req,next)=> { 

  const router= inject(Router);
  return next(req).pipe(  
    catchError((err: HttpErrorResponse) => { 
      if(err.status===401){ 
        localStorage.clear
        router.navigate(['/login'])
      }
      return throwError(() =>err)
    })
  );
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};