export enum RoleName {
    ADMIN = 'admin',
    USER = 'user',
    MANAGER = 'manager',
}

export const DEFAULT_ROLES: { name: string; slug: RoleName }[] = [
    { name: 'Administrator', slug: RoleName.ADMIN },
    { name: 'User', slug: RoleName.USER },
    { name: 'Manager', slug: RoleName.MANAGER },
];
export const LENGTH_SLUG_ROLE =60;
export const LENGTH_NAME_ROLE=100;
export const NAME_ROLE = 'Role';
