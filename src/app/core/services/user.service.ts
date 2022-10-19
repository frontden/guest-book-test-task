import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user";
import {PermissionService} from "./permission.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user$ = new BehaviorSubject<User | null >(null);

  get userSub$(): Observable<User | null> {
    return this.user$.asObservable();
  }

  get userId() {
    return this.user$.getValue()?.id;
  }

  constructor(private permissionService: PermissionService) {

  }

  updateUser() {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      return;
    }
    const user = JSON.parse(savedUser);
    this.permissionService.updatePermissions(this.permissionService.fetchUserPermissions(user.role));
    this.user$.next(user);
  }

}
