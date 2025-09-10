export enum PermissionName {
    CREATE_USER = 'create_user',
    UPDATE_USER = 'update_user',
    DELETE_USER = 'delete_user',
    VIEW_USER = 'view_user',

    CREATE_ROLE = 'create_role',
    UPDATE_ROLE = 'update_role',
    DELETE_ROLE = 'delete_role',
    VIEW_ROLE = 'view_role',
}

export const DEFAULT_PERMISSIONS: { name: string; slug: PermissionName }[] = [
    { name: 'Create user', slug: PermissionName.CREATE_USER },
    { name: 'Update user', slug: PermissionName.UPDATE_USER },
    { name: 'Delete user', slug: PermissionName.DELETE_USER },
    { name: 'View user', slug: PermissionName.VIEW_USER },
    { name: 'Create role', slug: PermissionName.CREATE_ROLE },
    { name: 'Update role', slug: PermissionName.UPDATE_ROLE },
    { name: 'Delete role', slug: PermissionName.DELETE_ROLE },
    { name: 'View role', slug: PermissionName.VIEW_ROLE },
];
