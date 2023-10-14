export interface List {
  _id: string;
  title: string;
  user: string;
  tasks?: [];
  deleted?: boolean;
}
