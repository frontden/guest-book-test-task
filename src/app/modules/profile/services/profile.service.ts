import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {APP_URLS} from "../../../core/constants/app.urls";
import {ProfileApiService} from "./profile-api.service";
import {Post, PostResponse, PostsResponse, ProfileData} from "../models/post";
import {HandlerService} from "./handler.service";
import {NewPost} from "../models/new-post";
import {CommentsData, CommentsResponse} from "../models/comment";
import {NewComment} from "../models/new-comment";

@Injectable({
  providedIn: 'any'
})
export class ProfileService {

  constructor(private profileApiService: ProfileApiService,
              private handlerService: HandlerService) {
  }

  loadPosts(page: number): Observable<ProfileData> {
    return this.profileApiService.loadPosts(page).pipe(
      map((response: PostsResponse) => {
        return {
          posts: response.data.map(post => this.handlerService.handlePost(post)),
          pagination: this.handlerService.handlePagination(response.meta),
        }
      }),
    );
  }

  createPost(newPost: NewPost): Observable<PostResponse> {
    return this.profileApiService.createPost(newPost);
  }

  deletePost(id: number): Observable<any> {
    return this.profileApiService.deletePost(id);
  }

  loadComments(postId: number, page: number): Observable<CommentsData> {
    return this.profileApiService.loadComments(postId, page).pipe(
      map((response: CommentsResponse) => {
        return {
          comments: response.data.map(comment => this.handlerService.handleComment(comment)),
          pagination: this.handlerService.handlePagination(response.meta),
        }
      }),
    );
  }

  createComment(postId: number, newComment: NewComment): Observable<CommentsResponse> {
    return this.profileApiService.createComment(postId, newComment);
  }

  deleteComment(postId: number, commentId: number): Observable<any> {
    return this.profileApiService.deleteComment(postId, commentId);
  }

}
