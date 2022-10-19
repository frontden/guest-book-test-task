export interface LoginData {
  email: string;
  password: string;
}

export const isLoginData = (value: any): value is LoginData =>
  (value as LoginData).email !== undefined
  && (value as LoginData).password !== undefined;
