import { User } from "./user";

export interface Portfolio {
  id: number;
  name: string;
  users: User[];
}
