import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BASE_URL } from '../constants/constants';
import { User } from '../models/user.model';

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
  constructor(private http: HttpClient) {}

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
}
