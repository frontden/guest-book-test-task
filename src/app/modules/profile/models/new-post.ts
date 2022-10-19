export interface NewPost {
  title: string;
  message: string;
}

export const isNewPost = (value: any): value is NewPost =>
  (value as NewPost).title !== undefined
  && (value as NewPost).message !== undefined;

