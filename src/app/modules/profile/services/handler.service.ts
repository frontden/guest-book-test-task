import { Injectable } from '@angular/core';
import {AnswerResponse, Post, PostResponse} from "../models/post";
import {Answer} from "../models/answer";
import {Comment} from "../models/comment";
import {handleUserData} from "../../../core/utils/auth-response.handler";
import {Pagination, PaginationResponse} from "../models/pagination";
import {CommentResponse} from "../models/comment";

@Injectable({
  providedIn: 'any'
})
export class HandlerService {

  constructor() {
  }

  handlePost(post: PostResponse): Post {
    return {
      id: post.id,
      userId: post.user_id,
      title: post.title,
      message: post.message,
      createdAt: new Date(post.created_at),
      updateAt: new Date(post.updated_at),
      user: handleUserData(post.user),
      answers: post.answers.map(answer => this.handleAnswer(answer)),
      answersCount: post.answers_count,
    }
  }

  handleAnswer(answer: AnswerResponse): Answer {
    return {
      id: answer.id,
      postId: answer.post_id,
      userId: answer.user_id,
      message: answer.message,
      createdAt: new Date(answer.created_at),
      updateAt: new Date(answer.updated_at),
    }
  }

  handleComment(comment: CommentResponse): Comment {
    return {
      id: comment.id,
      postId: comment.post_id,
      userId: comment.user_id,
      message: comment.message,
      createdAt: new Date(comment.created_at),
      updateAt: new Date(comment.updated_at),
      user: handleUserData(comment.user)
    }
  }

  handlePagination(pagination: PaginationResponse): Pagination {
    return {
      currentPage: pagination.current_page,
      from: pagination.from,
      lastPage: pagination.last_page,
      path: pagination.path,
      perPage: pagination.per_page,
      to: pagination.to,
      total: pagination.total,
    }
  }

}
