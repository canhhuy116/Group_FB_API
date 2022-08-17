export interface Group {
  id: number;
  name: string;
  type: string;
  description: string;
  owner: number;
  admins: number[];
  members: number[];
  posts: string[];
}
