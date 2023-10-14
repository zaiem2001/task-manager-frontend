import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BASE_URL, DUMMY_TOKEN } from '../constants/constants';
import { Task } from '../models/task.model';

const TASK_URLS = {
  get: `${BASE_URL}/tasks/list`,
  create: `${BASE_URL}/tasks/create`,
  update: `${BASE_URL}/tasks/update`,
};

type TaskResponse = {
  task: Task[];
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getListTasks(listId: string) {
    return this.http.get<TaskResponse>(`${TASK_URLS.get}/${listId}`, {
      headers: {
        authorization: 'Bearer ' + DUMMY_TOKEN,
      },
    });
  }

  updateTask({
    _id,
    completed,
    description,
  }: {
    _id: string;
    completed: boolean;
    description: string;
  }) {
    return this.http.post<{ task: Task }>(
      `${TASK_URLS.update}/${_id}`,
      {
        completed,
        description,
      },
      {
        headers: {
          authorization: 'Bearer ' + DUMMY_TOKEN,
        },
      }
    );
  }
}
