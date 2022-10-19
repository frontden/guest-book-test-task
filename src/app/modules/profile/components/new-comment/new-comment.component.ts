import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StateMatcher} from "../../../../core/utils/state-matcher";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {isNewPost} from "../../models/new-post";
import {isNewComment, NewComment} from "../../models/new-comment";

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent {

  matcher = new StateMatcher();

  form: FormGroup = this.formBuilder.group({
    message: this.formBuilder.control('', [Validators.required, Validators.maxLength(65535)])
  });

  get messageCtrl() {
    return this.form.get('message');
  }

  @Output() create = new EventEmitter<NewComment>();

  constructor(private formBuilder: FormBuilder) { }

  onPostButtonClicked(comment: NewComment) {
    if (!isNewComment(comment)) {
      return;
    }

    this.create.emit(comment);
  }

}
