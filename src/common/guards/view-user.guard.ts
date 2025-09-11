import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {PermissionName} from "../../modules/permissions/permissions-constant";

@Injectable()
export class ViewUserGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const { user } = request;
        const { userId } = request.params;

        if (!user) return false;

        const userPerms = user.role?.permissions?.map((p: any) => p.slug) ?? [];

        if (userPerms.includes(PermissionName.VIEW_ALL_USERS)) {
            return true;
        }

        if (userPerms.includes(PermissionName.VIEW_ME) && user.id === userId) {
            return true;
        }

        return false;
    }
}
