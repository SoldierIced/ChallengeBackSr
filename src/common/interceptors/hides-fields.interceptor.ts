import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class HideFieldsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const user = req.user;

        return next.handle().pipe(
            map((data) => {
                // Si no tiene permiso
                if (!user.role?.permissions?.some((p) => p.slug === 'view_salary')) {
                    if (Array.isArray(data)) {
                        return data.map(({ salary, ...rest }) => rest);
                    }
                    const { salary, ...rest } = data;
                    return rest;
                }
                return data;
            }),
        );
    }
}
