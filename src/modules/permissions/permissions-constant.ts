export enum PermissionName {
    CREATE_USER = 'create_user',
    UPDATE_ME = 'update_me',
    DELETE_USER = 'delete_user',
    UPDATE_USER = 'update_user',
    VIEW_ME = 'view_me',

    VIEW_ALL_USERS = 'view_all_users',
    VIEW_ALL_SALARY_USERS = 'view_all_salary_users',

    CREATE_ROLE = 'create_role',
    UPDATE_ROLE = 'update_role',
    DELETE_ROLE = 'delete_role',
    VIEW_ROLE = 'view_role',
    CREATE_PERMISSION = 'create_permission',
    UPDATE_PERMISSION = 'update_permission',
    DELETE_PERMISSION = 'delete_permission',
    VIEW_PERMISSION = 'view_permission',
}

export const PERMISSIONS_FIELDS_TO_HIDE = ['salary'];

export const DEFAULT_PERMISSIONS: { name: string; slug: PermissionName, fields_show?: string[] }[] = [
    {name: 'Create user', slug: PermissionName.CREATE_USER},
    {name: 'Update me', slug: PermissionName.UPDATE_ME},
    {name: 'Update user', slug: PermissionName.UPDATE_USER},
    {name: 'Delete user', slug: PermissionName.DELETE_USER},
    {name: 'View me', slug: PermissionName.VIEW_ME},
    {name: 'View all users', slug: PermissionName.VIEW_ALL_USERS},
    {name: 'View all salary users', slug: PermissionName.VIEW_ALL_SALARY_USERS, fields_show: ['salary']},
    {name: 'Create role', slug: PermissionName.CREATE_ROLE},
    {name: 'Update role', slug: PermissionName.UPDATE_ROLE},
    {name: 'Delete role', slug: PermissionName.DELETE_ROLE},
    {name: 'View role', slug: PermissionName.VIEW_ROLE},

    {name: 'Create permission', slug: PermissionName.CREATE_PERMISSION},
    {name: 'Update permission', slug: PermissionName.UPDATE_PERMISSION},
    {name: 'Delete permission', slug: PermissionName.DELETE_PERMISSION},
    {name: 'View permission', slug: PermissionName.VIEW_PERMISSION},
];

export const LENGTH_SLUG_PERMISSION = 60;
export const LENGTH_NAME_PERMISSION = 100;
export const NAME_PERMISSION = 'Permission';
