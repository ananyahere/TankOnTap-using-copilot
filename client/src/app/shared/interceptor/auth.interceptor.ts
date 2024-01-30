import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../service/localstorage.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private localstorageService: LocalstorageService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes('authenticate') || request.url.includes('register') || request.url.includes('api.geoapify.com')){
      return next.handle(request);
    }
    // get token from local storage
    const jwtToken = this.localstorageService.getItem('jwtToken');
    if(jwtToken) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + jwtToken)
      });
      return next.handle(cloned).pipe(
        catchError((error) => {
          if (error.status === 401) {
            // handle 401 Unauthorized error
            this.router.navigate(['/signin']);
          }
          // rethrow the error for the consumer to handle
          return throwError(error);
        })
      );
    } else {
      this.router.navigate(['/signin']);
      return next.handle(request);
    }
  }
}
