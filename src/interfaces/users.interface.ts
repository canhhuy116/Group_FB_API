export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  address: string;
  status: boolean;
  groups: number[];
}
