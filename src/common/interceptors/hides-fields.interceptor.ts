import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import {PERMISSIONS_FIELDS_TO_HIDE} from "../constants/index";

@Injectable()
export class HideFieldsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const user = req.user;

        return next.handle().pipe(
            map((data) => {
                if (!user?.role?.permissions) return this.cleanData(data, PERMISSIONS_FIELDS_TO_HIDE);
                const allowedFields = new Set(
                    user.role.permissions.flatMap((p: any) => p.fields_show || []),
                );
                const fieldsToHide = PERMISSIONS_FIELDS_TO_HIDE.filter(
                    (field) => !allowedFields.has(field),
                );
                return this.cleanData(data, fieldsToHide);
            }),
        );
    }

    private cleanData(data: any, fieldsToHide: string[]) {
        if (!data) return data;

        if (Array.isArray(data)) {
            return data.map((item) => this.stripFields(item, fieldsToHide));
        }

        return this.stripFields(data, fieldsToHide);
    }

    private stripFields(item: any, fieldsToHide: string[]) {
        if (!item || typeof item !== 'object') return item;
        const clean = { ...item };
        for (const field of fieldsToHide) {
            delete clean[field];
        }
        return clean;
    }
}
