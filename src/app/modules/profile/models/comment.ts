import {User} from "../../../core/models/user";
import {UserResponse} from "../../../core/models/auth-data";
import {Pagination, PaginationResponse} from "./pagination";

export interface CommentsData {
  comments: Array<Comment>;
  pagination: Pagination;
}

export interface CommentsResponse {
  data: Array<CommentResponse>;
  meta: PaginationResponse;
}
export interface Comment {
  id: number;
  postId: number;
  userId: number;
  message: string;
  createdAt: Date;
  updateAt: Date;
  user: User;
}

export interface CommentResponse {
  id: number;
  post_id: number;
  user_id: number;
  message: string;
  created_at: string;
  updated_at: string;
  user: UserResponse;
}
