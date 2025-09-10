import {RoleName} from "../../modules/roles/roles-constant";
import {DEFAULT_PERMISSIONS, PermissionName} from "../../modules/permissions/permissions-constant";

export * from '../../modules/roles/roles-constant';
export * from '../../modules/permissions/permissions-constant';
export * from '../../modules/users/users.constant';


export const ROLE_PERMISSIONS: Record<RoleName, PermissionName[]> = {
    [RoleName.ADMIN]: DEFAULT_PERMISSIONS.map(permission=>permission.slug),
    [RoleName.MANAGER]: [
        PermissionName.VIEW_USER,
        PermissionName.VIEW_ALL_USERS,
        PermissionName.VIEW_ROLE,
    ],
    [RoleName.USER]: [
        PermissionName.CREATE_USER,
        PermissionName.UPDATE_USER,
        PermissionName.VIEW_USER,
    ],
};
