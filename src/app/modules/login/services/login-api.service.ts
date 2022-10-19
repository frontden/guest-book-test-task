import { Injectable } from '@angular/core';
import {APP_URLS} from "../../../core/constants/app.urls";
import {HttpClient} from "@angular/common/http";
import {NewUser} from "../../registration/models/new-user";
import {Observable} from "rxjs";
import {LoginData} from "../models/login-data";
import {AuthResponse} from "../../../core/models/auth-data";


@Injectable({
  providedIn: 'any'
})
export class LoginApiService {

  backendUrl = APP_URLS.backend;

  constructor(private httpClient: HttpClient) {
  }

  login(data: LoginData): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(this.backendUrl + 'auth/login', data);
  }
}
