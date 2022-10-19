import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user";
import {AuthData} from "../models/auth-data";
import {PermissionService} from "./permission.service";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  get isLoggedInSub$(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  constructor(private userService: UserService) {

  }

  setSession(data: { user: User, authData: AuthData }) {

    localStorage.setItem('access_token', data.authData.accessToken);
    localStorage.setItem('expires_at', data.authData.expiresAt.toString() );
    localStorage.setItem('user', JSON.stringify(data.user));
    this.isLoggedIn$.next(true);
    this.userService.updateUser();
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    const expires = localStorage.getItem('expires_at');
    if (!expires) {
      return false;
    }

    const isExpired = new Date().getTime() > new Date(expires).getTime();
    this.isLoggedIn$.next(!isExpired);
    this.userService.updateUser();
    return !isExpired;
  }

}
