import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import {STATUS_SUCCESS} from "../constants";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                if (data?.items && data?.meta) {
                    return {
                        status:data?.status || STATUS_SUCCESS,
                        ...(data.message ? { message: data.message } : {}),
                        items: data.items,
                        meta: data.meta,
                    };
                }
                return {
                    status: STATUS_SUCCESS,
                    ...(data.message ? { message: data.message } : {}),
                    data: data?.data ?? data,
                };
            }),
        );
    }
}
