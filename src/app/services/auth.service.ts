import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BASE_URL, LOCAL_STORAGE_KEYS } from '../constants/constants';
import { User } from '../models/user.model';
import {
  getDataFromLocalStorage,
  removeDataFromStorage,
} from '../utils/auth.helper';
import { Router } from '@angular/router';

const AUTH_URLS = {
  login: `${BASE_URL}/auth/login`,
  signup: `${BASE_URL}/auth/signup`,
};

type UserData = {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(userData: UserData) {
    return this.http.post<{ user: User; token: string }>(AUTH_URLS.login, {
      ...userData,
    });
  }

  signup(userData: UserData) {
    return this.http.post<User>(AUTH_URLS.signup, {
      ...userData,
    });
  }

  logout() {
    removeDataFromStorage(LOCAL_STORAGE_KEYS.TOKEN);
    this.router.navigate(['/auth']);
  }

  isLoggedIn() {
    const token = getDataFromLocalStorage(LOCAL_STORAGE_KEYS.TOKEN);
    return !!token;
  }
}
