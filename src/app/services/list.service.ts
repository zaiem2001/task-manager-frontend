import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BASE_URL, DUMMY_TOKEN } from '../constants/constants';
import { List } from '../models/list.model';

const LIST_URLS = {
  get: `${BASE_URL}/list/all`,
  create: `${BASE_URL}/list/create`,
};

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private http: HttpClient) {}

  getUsersList() {
    return this.http.get<{ list: List[] }>(LIST_URLS.get, {
      headers: {
        authorization: 'Bearer ' + DUMMY_TOKEN,
      },
    });
  }
}