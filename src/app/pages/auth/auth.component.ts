import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from 'src/app/services/auth.service';
import { saveToLocalStorage } from 'src/app/utils/auth.helper';
import { LOCAL_STORAGE_KEYS } from 'src/app/constants/constants';

const AUTH_TYPES = ['login', 'signup'];

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  authMode = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((query) => {
      const { type } = query;

      if (!type || !AUTH_TYPES.includes(type)) {
        this.router.navigate(['/auth'], {
          relativeTo: this.route,
          queryParams: { type: 'login' },
        });
      }

      this.authMode = type;
    });
  }

  getAuthData() {
    return {
      title: this.authMode === 'login' ? 'Login' : 'Sign Up',
      redirect: this.authMode === 'login' ? 'Sign Up' : 'Login',
      text:
        this.authMode === 'login' ? 'New here?' : 'Already have and Account?',
    };
  }

  onSubmit(formData: NgForm) {
    const { value } = formData;

    if (this.authMode === 'login') {
      this.login(value);
      return;
    }

    this.authService
      .signup(value)
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)))
      .subscribe((response) => {
        if (response) {
          this.displaySnackBar('Signup success!');
          formData.reset();
          this.router.navigate(['/auth'], {
            relativeTo: this.route,
            queryParams: { type: 'login' },
          });
        }
      });
  }

  private login(userData: { email: string; password: string }) {
    this.authService
      .login(userData)
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)))
      .subscribe((response) => {
        const { token } = response;
        saveToLocalStorage({ key: LOCAL_STORAGE_KEYS.TOKEN, value: token });
        this.router.navigate(['/']);
      });
  }

  private displaySnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      verticalPosition: 'top',
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error && error.error.message) {
      const errorMsg = error.error.message;
      this.displaySnackBar(errorMsg);
    }
    return throwError(() => error);
  }
}
