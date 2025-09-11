import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {VersioningType} from "@nestjs/common";
import {ResponseInterceptor} from "./common/interceptors/response.interceptor";
import {AllExceptionsFilter} from "./common/filters/all-exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableVersioning({
        type: VersioningType.URI,
        prefix: 'v',
        defaultVersion: '1'
    })
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.useGlobalFilters(new AllExceptionsFilter())
    await app.listen(process.env.APP_PORT ?? 3000);
}

bootstrap();
