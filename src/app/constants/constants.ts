import { List } from '../models/list.model';
import { Task } from '../models/task.model';

export const DUMMY_LISTS: List[] = [
  {
    _id: '1',
    title: 'Test Title',
    user: 'test-user',
  },
  {
    _id: '2',
    title: 'Test Title 2',
    user: 'test-user',
  },
  {
    _id: '3',
    title: 'Test Title 3',
    user: 'test-user',
  },
];

export const DUMMY_TASKS: Task[] = [
  {
    _id: '1',
    description: 'This is a test decription',
    user: 'test-user',
    list: '1',
    completed: false,
  },
  {
    _id: '1',
    description: 'This is a test decription',
    user: 'test-user',
    list: '1',
    completed: true,
  },
  {
    _id: '1',
    description: 'This is a test decription',
    user: 'test-user',
    list: '2',
    completed: false,
  },
  {
    _id: '1',
    description: 'This is a test decription',
    user: 'test-user',
    list: '2',
    completed: false,
  },
];
