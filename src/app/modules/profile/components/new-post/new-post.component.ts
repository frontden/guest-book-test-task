import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StateMatcher} from "../../../../core/utils/state-matcher";
import {isNewPost, NewPost} from "../../models/new-post";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPostComponent implements OnInit {

  matcher = new StateMatcher();

  form: FormGroup = this.formBuilder.group({
    title: this.formBuilder.control('', [Validators.required, Validators.maxLength(255)]),
    message: this.formBuilder.control('', [Validators.required, Validators.maxLength(65535)])
  });

  get titleCtrl() {
    return this.form.get('title');
  }

  get messageCtrl() {
    return this.form.get('message');
  }

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<NewPostComponent>) { }

  ngOnInit(): void {
  }

  onCreateButtonClicked(post: NewPost) {
    if (!isNewPost(post)) {
      return;
    }
    this.dialogRef.close(post);
  }

  close() {
    this.dialogRef.close(null);
  }

}
