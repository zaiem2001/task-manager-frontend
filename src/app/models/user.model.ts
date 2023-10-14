import { Task } from './task.model';

export interface User {
  email: string;
  isAdmin: boolean;
  deleted: boolean;
  tasks?: Task[];
}
