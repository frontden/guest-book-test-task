import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import {RouterModule, Routes} from "@angular/router";
import {LoginService} from "./services/login.service";
import {LoginApiService} from "./services/login-api.service";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  providers: [
    LoginService,
    LoginApiService
  ]
})
export class LoginModule { }
