import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { getDataFromLocalStorage } from '../utils/auth.helper';
import { ERROR_MESSAGES, LOCAL_STORAGE_KEYS } from '../constants/constants';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isUserLoggedIn = this.authService.isLoggedIn();

    if (isUserLoggedIn) {
      const clonedRequest = req.clone({
        headers: new HttpHeaders().append(
          'Authorization',
          this.getAuthHeaders().Authorization
        ),
      });

      return next.handle(clonedRequest).pipe(catchError(this.handleError));
    }

    return next.handle(req);
  }

  private handleError = (error: HttpErrorResponse) => {
    if (error && error.error.message === ERROR_MESSAGES.JWT_EXPIRED) {
      this.authService.logout();
    }
    return throwError(() => error);
  };

  private getAuthHeaders = () => {
    return {
      Authorization: `Bearer ${getDataFromLocalStorage(
        LOCAL_STORAGE_KEYS.TOKEN
      )}`,
    };
  };
}
