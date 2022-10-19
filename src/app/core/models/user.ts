import {ROLES} from "../constants/app.roles";

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  is_admin: boolean;
  created_at: Date;
  updated_at: Date;
  role: ROLES;
}

