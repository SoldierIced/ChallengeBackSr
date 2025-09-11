import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class UserOwnershipGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const { user } = request; //usuario de jwt request
        const userId  = request.params?.userId || request.body?.userId; // id de params o body

        if (!user) return false;

        return user.id === userId;
    }
}
