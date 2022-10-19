export interface NewComment {
  message: string;
}

export const isNewComment = (value: any): value is NewComment =>
 (value as NewComment).message !== undefined;

