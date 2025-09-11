import {RoleName} from "../../modules/roles/roles-constant";
import {DEFAULT_PERMISSIONS, PermissionName} from "../../modules/permissions/permissions-constant";

export * from '../../modules/roles/roles-constant';
export * from '../../modules/permissions/permissions-constant';
export * from '../../modules/users/users.constant';


export const ROLE_PERMISSIONS: Record<RoleName, PermissionName[]> = {
    [RoleName.ADMIN]: DEFAULT_PERMISSIONS.map(permission => permission.slug),
    [RoleName.MANAGER]: [
        PermissionName.VIEW_ME,
        PermissionName.VIEW_ALL_USERS,
        PermissionName.VIEW_ROLE,
        PermissionName.VIEW_ALL_SALARY_USERS
    ],
    [RoleName.USER]: [
        PermissionName.VIEW_ME,
        PermissionName.UPDATE_ME
    ],
};

export const SUCCESS_MESSAGES = {
    DELETE: (val: string) => `${val} deleted successfully`,
    CREATE: (val: string) => `${val} created successfully`,
    UPDATE: (val: string) => `${val} updated successfully`,

};

export const STATUS_SUCCESS = 'success';

export const STATUS_ERROR = 'error';

export const ERROR_MESSAGE_DEFAULT = 'Internal server error';
export const ERROR_CODE_DEFAULT = 'INTERNAL_ERROR';
