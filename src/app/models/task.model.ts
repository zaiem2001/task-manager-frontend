export interface Task {
  _id: string;
  description: string;
  user: Object;
  list: Object;
  completed: boolean;
  deleted?: boolean;
}
