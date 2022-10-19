import {Injectable} from '@angular/core';
import {ADMIN_PERMISSIONS, PERMISSIONS} from "../constants/app.permissions";
import {ROLES} from "../constants/app.roles";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  userPermissions: PERMISSIONS[] = [];

  constructor() { }

  fetchUserPermissions(role: ROLES): PERMISSIONS[] {
    switch (role) {
      case ROLES.USER:
        return [];
      case ROLES.ADMIN:
        return ADMIN_PERMISSIONS;
      default:
        return [];
    }
  }

  isAllowed(permission: PERMISSIONS): boolean {
    return !!this.userPermissions.find(value => value === permission);
  }

  updatePermissions(permissions: PERMISSIONS[]) {
    this.userPermissions = permissions;
  }
}


