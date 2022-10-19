import { Injectable } from '@angular/core';
import {APP_URLS} from "../../../core/constants/app.urls";
import {HttpClient} from "@angular/common/http";
import {NewUser} from "../models/new-user";
import {Observable} from "rxjs";
import {AuthResponse} from "../../../core/models/auth-data";

@Injectable({
  providedIn: 'any'
})
export class RegistrationApiService {

  backendUrl = APP_URLS.backend;

  constructor(private httpClient: HttpClient) {
  }

  register(user: NewUser): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(this.backendUrl + 'auth/register', {
      ...user,
      password_confirmation: user.password
    });
  }
}
