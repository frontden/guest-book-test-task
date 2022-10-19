import { Injectable } from '@angular/core';

import {LoginApiService} from "./login-api.service";
import {LoginData} from "../models/login-data";
import {map, Observable} from "rxjs";
import {AuthData, AuthResponse} from "../../../core/models/auth-data";
import {handleAuthResponse} from "../../../core/utils/auth-response.handler";
import {User} from "../../../core/models/user";

@Injectable({
  providedIn: 'any'
})
export class LoginService {

  constructor(private loginApiService: LoginApiService) { }

  login(data: LoginData): Observable<{ user: User, authData: AuthData }> {
    return this.loginApiService.login(data).pipe(
      map( (data: AuthResponse) => handleAuthResponse(data))
    );
  }

}
