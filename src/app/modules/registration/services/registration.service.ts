import { Injectable } from '@angular/core';
import {NewUser} from "../models/new-user";
import {map, Observable} from "rxjs";
import {RegistrationApiService} from "./registration-api.service";
import {handleAuthResponse} from "../../../core/utils/auth-response.handler";
import {AuthData, AuthResponse} from "../../../core/models/auth-data";
import {User} from "../../../core/models/user";

@Injectable({
  providedIn: 'any'
})
export class RegistrationService {

  constructor(private registrationApiService: RegistrationApiService) { }

  register(user: NewUser): Observable<{ user: User, authData: AuthData }> {
    return this.registrationApiService.register(user).pipe(
      map( (data: AuthResponse) => handleAuthResponse(data))
    );
  }
}
