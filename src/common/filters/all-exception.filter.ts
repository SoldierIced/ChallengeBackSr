import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import {ERROR_CODE_DEFAULT, ERROR_MESSAGE_DEFAULT} from "../constants";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        let message = ERROR_MESSAGE_DEFAULT;
        let code = ERROR_CODE_DEFAULT;
        let details: any = null;

        if (exception instanceof HttpException) {
            const res = exception.getResponse();
            if (typeof res === 'string') {
                message = res;
            } else if (typeof res === 'object') {
                message = (res as any).message || message;
                code = (res as any).code || code;
                details = (res as any).details || null;
            }
        } else if (exception.message) {
            message = exception.message;
        }

        response.status(status).json({
            status: 'error',
            message,
            code,
            ...(details ? { details } : {}),
        });
    }
}
