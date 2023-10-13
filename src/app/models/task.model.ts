export interface Task {
  _id: string;
  description: string;
  user: string;
  list: string;
  completed: boolean;
  deleted?: boolean;
}
