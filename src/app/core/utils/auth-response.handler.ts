import {AuthData, AuthResponse, UserResponse} from "../models/auth-data";
import {User} from "../models/user";
import {ROLES} from "../constants/app.roles";

export function handleAuthResponse(data: AuthResponse): {user: User, authData: AuthData} {
  return {
    user: handleUserData(data.user),
    authData: {
      accessToken: data.token.access_token,
      expiresAt: new Date(data.token.expires_at),
    }

  }
}

export function handleUserData(user: UserResponse): User {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    is_admin: !!user.is_admin,
    created_at: new Date(user.created_at),
    updated_at: new Date(user.updated_at),
    role: !!user.is_admin ? ROLES.ADMIN : ROLES.USER,
  }
}
