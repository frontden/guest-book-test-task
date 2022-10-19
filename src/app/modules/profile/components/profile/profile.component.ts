import {ChangeDetectionStrategy, Component, OnDestroy, ViewChild} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {BehaviorSubject, combineLatest, filter, Subject, switchMap, takeUntil} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {UserService} from "../../../../core/services/user.service";
import {Post} from "../../models/post";
import {PermissionService} from "../../../../core/services/permission.service";
import {PERMISSIONS} from "../../../../core/constants/app.permissions";
import {MatDialog} from "@angular/material/dialog";
import {NewPostComponent} from "../new-post/new-post.component";
import {SnackbarService} from "../../../../core/services/snackbar.service";
import {NewPost} from "../../models/new-post";
import {MatPaginator} from "@angular/material/paginator/paginator";
import {NewComment} from "../../models/new-comment";
import {Comment} from "../../models/comment";
import {trackById} from "../../../../core/utils/track-by-id";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnDestroy {

  trackByFn = trackById;

  destroy$: Subject<boolean> = new Subject<boolean>();

  page$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  commentsPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  postId$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

  profileData$ = this.page$.pipe(
    switchMap((page: number) => this.profileService.loadPosts(page)),
  );

  commentsData$ = combineLatest([this.postId$, this.commentsPage$]).pipe(
    filter(([postId]) => postId >= 0),
    switchMap(([postId, page])  => this.profileService.loadComments(postId, page)),
  )

  activeCommentsPostUserId: number | null = null;

  @ViewChild('postPaginator') postPaginator: MatPaginator | null = null;
  @ViewChild('commentPaginator') commentPaginator: MatPaginator | null = null;

  constructor(private profileService: ProfileService,
              private userService: UserService,
              private permissionService: PermissionService,
              public dialog: MatDialog,
              private snackbarService: SnackbarService) {}

  onPageChanged(newPage: PageEvent) {
    this.page$.next(newPage.pageIndex + 1);
  }

  onCommentPageChanged(newPage: PageEvent) {
    this.commentsPage$.next(newPage.pageIndex + 1);
  }

  checkPossibilityDeletePost(post: Post): boolean {
    if (post.userId === this.userService.userId) {
      return true;
    }

    return this.permissionService.isAllowed(PERMISSIONS.DELETE_POST);
  }

  checkPossibilityDeleteComment(comment: Comment): boolean {
    if (comment.userId === this.userService.userId) {
      return true;
    }

    return this.permissionService.isAllowed(PERMISSIONS.DELETE_COMMENT);
  }

  checkPossibilityAddComment(): boolean {
    if (this.activeCommentsPostUserId === this.userService.userId) {
      return true;
    }

    return this.permissionService.isAllowed(PERMISSIONS.ADD_COMMENT);
  }

  createPost() {
    const dialogRef = this.dialog.open(NewPostComponent);

    dialogRef.afterClosed().pipe(
      filter(result => !!result),
      switchMap((newPost: NewPost) => this.profileService.createPost(newPost)),
      takeUntil(this.destroy$)
    ).subscribe({
        next: () => {
          if (this.page$.getValue() === 1) {
            this.page$.next(this.page$.getValue());
          } else {
            this.postPaginator?.firstPage();
          }

        }
      });
  }

  deletePost(id: number) {
    this.profileService.deletePost(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.page$.next(this.page$.getValue());
      }
    });
  }

  deleteComment(id: number) {
    this.profileService.deleteComment(this.postId$.getValue(), id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.commentsPage$.next(this.commentsPage$.getValue());
      }
    });
  }

  showComments(postId: number, userId: number) {
    this.activeCommentsPostUserId = userId;
    this.postId$.next(postId);
    this.commentsPage$.next(1);
  }

  createComment(newComment: NewComment) {
    this.profileService.createComment(this.postId$.getValue(), newComment).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        if (this.commentsPage$.getValue() === 1) {
          this.commentsPage$.next(this.commentsPage$.getValue());
        } else {
          this.commentPaginator?.lastPage();
        }
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
