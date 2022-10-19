export interface NewUser {
  avatar?: File;
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
}

export const isNewUser = (value: any): value is NewUser =>
  (value as NewUser).email !== undefined
  && (value as NewUser).name !== undefined
  && (value as NewUser).password !== undefined;
