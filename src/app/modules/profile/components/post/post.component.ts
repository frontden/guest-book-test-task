import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../models/post";
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";
import {BehaviorSubject} from "rxjs";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {

  data: Post | null = null;
  avatar$ = new BehaviorSubject<SafeStyle | null>(null);

  @Input() set post(post: Post) {
    this.data = post;
    this.createSafeAvatar(post.user.avatar);
  }

  @Input() isDeleteAllowed = false;

  @Output() deleted = new EventEmitter();
  @Output() clicked = new EventEmitter();

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

  onPostClicked() {
    this.clicked.emit();
  }
}
