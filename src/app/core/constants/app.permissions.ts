export enum PERMISSIONS {
  DELETE_POST = "delete post",
  DELETE_COMMENT = "delete comment",
  ADD_COMMENT = "add comment",
}

export const ADMIN_PERMISSIONS: PERMISSIONS[] = [
  PERMISSIONS.DELETE_POST,
  PERMISSIONS.DELETE_COMMENT,
  PERMISSIONS.ADD_COMMENT,
]
