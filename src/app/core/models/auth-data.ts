export interface AuthData {
  accessToken: string;
  expiresAt: Date;
}

export interface AuthResponse {
  user: UserResponse;
  token: {
    access_token: string;
    expires_at: string;
  }
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  is_admin: boolean | number;
  created_at: string;
  updated_at: string;
}
