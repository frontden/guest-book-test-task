import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from "../../models/comment";
import {BehaviorSubject} from "rxjs";
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {

  data: Comment | null = null;
  avatar$ = new BehaviorSubject<SafeStyle | null>(null);

  @Input() set comment(post: Comment) {
    this.data = post;
    this.createSafeAvatar(post.user.avatar);
  }

  @Input() isDeleteAllowed = false;

  @Output() deleted = new EventEmitter();

  constructor(private sanitizer: DomSanitizer) { }

  createSafeAvatar(avatarUrl: string | null) {
    if (!avatarUrl ) {
      this.avatar$.next(null);
      return;
    }
    this.avatar$.next(this.sanitizer.bypassSecurityTrustStyle(`url(${avatarUrl})`));
  }

  onDeleteButtonClicked(event: MouseEvent) {
    event.stopPropagation();
    this.deleted.emit();
  }

}
