import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import {RouterModule, Routes} from "@angular/router";
import {ProfileApiService} from "./services/profile-api.service";
import {ProfileService} from "./services/profile.service";
import {MatCardModule} from '@angular/material/card';
import {HandlerService} from "./services/handler.service";
import { PostComponent } from './components/post/post.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from '@angular/material/dialog';
import { NewPostComponent } from './components/new-post/new-post.component';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { CommentComponent } from './components/comment/comment.component';
import { NewCommentComponent } from './components/new-comment/new-comment.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
];

@NgModule({
  declarations: [
    ProfileComponent,
    PostComponent,
    NewPostComponent,
    CommentComponent,
    NewCommentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [
    ProfileService,
    ProfileApiService,
    HandlerService
  ]
})
export class ProfileModule { }
