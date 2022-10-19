import {User} from "../../../core/models/user";
import {Answer} from "./answer";
import {UserResponse} from "../../../core/models/auth-data";
import {Pagination, PaginationResponse} from "./pagination";

export interface ProfileData {
  posts: Array<Post>;
  pagination: Pagination;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  message: string;
  createdAt: Date;
  updateAt: Date;
  user: User;
  answers: Array<Answer>;
  answersCount: number;
}

export interface PostsResponse {
  data: Array<PostResponse>;
  meta: PaginationResponse;
}

export interface PostResponse {
  id: number;
  user_id: number;
  title: string;
  message: string;
  created_at: string;
  updated_at: string;
  user: UserResponse;
  answers: Array<AnswerResponse>;
  answers_count: number;
}

export interface AnswerResponse {
  id: number;
  post_id: number;
  user_id: number;
  message: string;
  created_at: string;
  updated_at: string;
}
