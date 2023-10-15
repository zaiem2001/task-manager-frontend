import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BASE_URL } from '../constants/constants';
import { List } from '../models/list.model';

const LIST_URLS = {
  get: `${BASE_URL}/list/all`,
  create: `${BASE_URL}/list/create`,
  delete: `${BASE_URL}/list`,
};

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private http: HttpClient) {}

  getUsersList() {
    return this.http.get<{ list: List[] }>(LIST_URLS.get, {});
  }

  createNewList(title: string) {
    return this.http.post<{ list: List }>(LIST_URLS.create, { title });
  }

  deleteList(listId: string) {
    return this.http.delete<{ list: List }>(`${LIST_URLS.delete}/${listId}`);
  }
}
