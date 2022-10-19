import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {APP_URLS} from "../../../core/constants/app.urls";
import {HttpClient} from "@angular/common/http";
import {PostResponse, PostsResponse} from "../models/post";
import {NewPost} from "../models/new-post";
import {CommentsResponse} from "../models/comment";
import {NewComment} from "../models/new-comment";

@Injectable({
  providedIn: 'any'
})
export class ProfileApiService {

  backendUrl = APP_URLS.backend;

  constructor(private httpClient: HttpClient) {
  }

  loadPosts(page: number): Observable<PostsResponse> {
    return this.httpClient.get<PostsResponse>(this.backendUrl + `posts?page=${page}`);
  }

  createPost(newPost: NewPost): Observable<PostResponse> {
    return this.httpClient.post<PostResponse>(this.backendUrl + `posts`, newPost);
  }

  deletePost(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.backendUrl + `posts/${id}`);
  }

  loadComments(postId: number, page: number): Observable<CommentsResponse> {
    return this.httpClient.get<CommentsResponse>(this.backendUrl + `posts/${postId}/answers?page=${page}`);
  }

  deleteComment(postId: number, commentId: number): Observable<any> {
    return this.httpClient.delete<any>(this.backendUrl + `posts/${postId}/answers/${commentId}`);
  }


  createComment(postId: number, newComment: NewComment): Observable<CommentsResponse> {
    return this.httpClient.post<CommentsResponse>(this.backendUrl + `posts/${postId}/answers`, newComment);
  }
}
