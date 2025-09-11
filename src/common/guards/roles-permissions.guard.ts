import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {ROLES_KEY} from "../decorators/roles.decorator";
import {PERMISSIONS_KEY} from "../decorators/permissions.decorator";

@Injectable()
export class RolesPermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]) || [];

        const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]) || [];

        const {user} = context.switchToHttp().getRequest();

        // Si no hay usuario
        if (!user) return false;

        // Validacion de roles
        if (requiredRoles.length && !requiredRoles.includes(user.role?.slug)) {
            return false;
        }

        // Validacion de permisos
        if (requiredPermissions.length) {
            const userPerms = user.role?.permissions?.map((p) => p.slug) ?? [];
            const hasAll = requiredPermissions.every((perm) => userPerms.includes(perm));
            if (!hasAll) return false;
        }

        return true;
    }
}
